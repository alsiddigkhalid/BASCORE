import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database('bascore.db');
const JWT_SECRET = 'bascore-secret-key-123';

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'customer'
  );

  CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'open',
    priority TEXT DEFAULT 'medium',
    category TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    senderId INTEGER NOT NULL,
    text TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (senderId) REFERENCES users(id)
  );
`);

const app = express();
const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer });

app.use(express.json());

// WebSocket handling
const clients = new Map<WebSocket, any>();
wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      if (message.type === 'AUTH') {
        const decoded: any = jwt.verify(message.token, JWT_SECRET);
        clients.set(ws, decoded);
      }
    } catch (e) {}
  });
  ws.on('close', () => clients.delete(ws));
});

function broadcast(message: any) {
  const data = JSON.stringify(message);
  clients.forEach((user, client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// Auth Middleware
const authenticate = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const authorize = (roles: string[]) => (req: any, res: any, next: any) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

// API Routes
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || 'customer';
    const info = db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run(name, email, hashedPassword, userRole);
    const token = jwt.sign({ id: info.lastInsertRowid, email, name, role: userRole }, JWT_SECRET);
    res.json({ token, user: { id: info.lastInsertRowid, name, email, role: userRole } });
  } catch (e: any) {
    res.status(400).json({ error: e.message.includes('UNIQUE') ? 'Email already exists' : 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user: any = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id, email, name: user.name, role: user.role }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email, role: user.role } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/tickets', authenticate, (req: any, res) => {
  let tickets;
  if (req.user.role === 'admin' || req.user.role === 'staff') {
    tickets = db.prepare(`
      SELECT tickets.*, users.name as userName, users.email as userEmail 
      FROM tickets 
      JOIN users ON tickets.userId = users.id 
      ORDER BY createdAt DESC
    `).all();
  } else {
    tickets = db.prepare('SELECT * FROM tickets WHERE userId = ? ORDER BY createdAt DESC').all(req.user.id);
  }
  res.json(tickets);
});

app.post('/api/tickets', authenticate, (req: any, res) => {
  const { title, description, category, priority } = req.body;
  const info = db.prepare('INSERT INTO tickets (userId, title, description, category, priority) VALUES (?, ?, ?, ?, ?)').run(
    req.user.id, title, description, category, priority || 'medium'
  );
  const newTicket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(info.lastInsertRowid);
  
  broadcast({ type: 'TICKET_CREATED', ticket: newTicket });
  res.json(newTicket);
});

app.patch('/api/tickets/:id', authenticate, authorize(['admin', 'staff']), (req: any, res) => {
  const { status } = req.body;
  db.prepare('UPDATE tickets SET status = ? WHERE id = ?').run(status, req.params.id);
  const updatedTicket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(req.params.id);
  broadcast({ type: 'TICKET_UPDATED', ticket: updatedTicket });
  res.json(updatedTicket);
});

app.get('/api/messages', authenticate, (req, res) => {
  const messages = db.prepare(`
    SELECT messages.*, users.name as senderName, users.role as senderRole
    FROM messages
    JOIN users ON messages.senderId = users.id
    ORDER BY createdAt ASC
    LIMIT 100
  `).all();
  res.json(messages);
});

app.post('/api/messages', authenticate, (req: any, res) => {
  const { text } = req.body;
  const info = db.prepare('INSERT INTO messages (senderId, text) VALUES (?, ?)').run(req.user.id, text);
  const newMessage = db.prepare(`
    SELECT messages.*, users.name as senderName, users.role as senderRole
    FROM messages
    JOIN users ON messages.senderId = users.id
    WHERE messages.id = ?
  `).get(info.lastInsertRowid);

  broadcast({ type: 'NEW_MESSAGE', message: newMessage });
  res.json(newMessage);
});

// Vite Integration
if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

const PORT = 3000;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
