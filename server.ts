import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

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
    assignedTo INTEGER,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'open',
    priority TEXT DEFAULT 'medium',
    category TEXT NOT NULL,
    type TEXT DEFAULT 'Question',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (assignedTo) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticketId INTEGER NOT NULL,
    senderId INTEGER NOT NULL,
    text TEXT NOT NULL,
    isPrivate INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticketId) REFERENCES tickets(id),
    FOREIGN KEY (senderId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS consultations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    inquiry TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Migration: Add missing columns if they don't exist
const tableInfo = db.prepare("PRAGMA table_info(tickets)").all();
if (!tableInfo.some((col: any) => col.name === 'type')) {
  try { db.exec("ALTER TABLE tickets ADD COLUMN type TEXT DEFAULT 'Question'"); } catch (e) {}
}
if (!tableInfo.some((col: any) => col.name === 'updatedAt')) {
  try { db.exec("ALTER TABLE tickets ADD COLUMN updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP"); } catch (e) {}
}

const msgTableInfo = db.prepare("PRAGMA table_info(messages)").all();
if (!msgTableInfo.some((col: any) => col.name === 'isPrivate')) {
  try { db.exec("ALTER TABLE messages ADD COLUMN isPrivate INTEGER DEFAULT 0"); } catch (e) {}
}

// Seed Admin User
const adminExists = db.prepare('SELECT * FROM users WHERE email = ?').get('admin@bascore.ae');
if (!adminExists) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run('Admin', 'admin@bascore.ae', hashedPassword, 'admin');
}

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

// Consultations
app.post('/api/consultations', async (req, res) => {
  const { name, phone, email, company, inquiry } = req.body;
  if (!name || !phone || !email || !company || !inquiry) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const stmt = db.prepare('INSERT INTO consultations (name, phone, email, company, inquiry) VALUES (?, ?, ?, ?, ?)');
    stmt.run(name, phone, email, company, inquiry);

    // Optional: Send Email if SMTP is configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"BASCORE Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
        subject: `New Consultation Request from ${name}`,
        text: `
          Name: ${name}
          Phone: ${phone}
          Email: ${email}
          Company: ${company}
          Inquiry: ${inquiry}
        `,
        html: `
          <h3>New Consultation Request</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Inquiry:</strong> ${inquiry}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Consultation error:', error);
    res.status(500).json({ error: 'Failed to save consultation' });
  }
});

// API Routes
app.post('/api/auth/register', authenticate, authorize(['admin']), async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || 'customer';
    const info = db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run(name, email, hashedPassword, userRole);
    res.json({ message: 'User created successfully', user: { id: info.lastInsertRowid, name, email, role: userRole } });
  } catch (e: any) {
    res.status(400).json({ error: e.message.includes('UNIQUE') ? 'Email already exists' : 'Registration failed' });
  }
});

// Public login only
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

app.get('/api/auth/users', authenticate, authorize(['admin']), (req, res) => {
  const users = db.prepare('SELECT id, name, email, role FROM users').all();
  res.json(users);
});

app.get('/api/tickets', authenticate, (req: any, res) => {
  let tickets;
  if (req.user.role === 'admin' || req.user.role === 'staff') {
    tickets = db.prepare(`
      SELECT tickets.*, u1.name as userName, u1.email as userEmail, u2.name as agentName
      FROM tickets 
      JOIN users u1 ON tickets.userId = u1.id 
      LEFT JOIN users u2 ON tickets.assignedTo = u2.id
      ORDER BY createdAt DESC
    `).all();
  } else {
    tickets = db.prepare(`
      SELECT tickets.*, u2.name as agentName
      FROM tickets 
      LEFT JOIN users u2 ON tickets.assignedTo = u2.id
      WHERE userId = ? 
      ORDER BY createdAt DESC
    `).all(req.user.id);
  }
  res.json(tickets);
});

app.post('/api/tickets', authenticate, (req: any, res) => {
  const { title, description, category, priority, type, assignedTo: manualAssignedTo } = req.body;
  
  let assignedTo = manualAssignedTo;

  if (!assignedTo) {
    const staff = db.prepare("SELECT id FROM users WHERE role = 'staff' OR role = 'admin' ORDER BY RANDOM() LIMIT 1").get();
    assignedTo = staff ? staff.id : null;
  }

  const info = db.prepare('INSERT INTO tickets (userId, assignedTo, title, description, category, priority, type) VALUES (?, ?, ?, ?, ?, ?, ?)').run(
    req.user.id, assignedTo, title, description, category, priority || 'medium', type || 'Question'
  );
  
  const newTicket = db.prepare(`
    SELECT tickets.*, u1.name as userName, u1.email as userEmail, u2.name as agentName
    FROM tickets 
    JOIN users u1 ON tickets.userId = u1.id
    LEFT JOIN users u2 ON tickets.assignedTo = u2.id
    WHERE tickets.id = ?
  `).get(info.lastInsertRowid);
  
  broadcast({ type: 'TICKET_CREATED', ticket: newTicket });
  res.json(newTicket);
});

app.patch('/api/tickets/:id', authenticate, authorize(['admin', 'staff']), (req: any, res) => {
  const { status, priority, type, assignedTo } = req.body;
  
  const updates: string[] = [];
  const params: any[] = [];

  if (status !== undefined) { updates.push('status = ?'); params.push(status); }
  if (priority !== undefined) { updates.push('priority = ?'); params.push(priority); }
  if (type !== undefined) { updates.push('type = ?'); params.push(type); }
  if (assignedTo !== undefined) { updates.push('assignedTo = ?'); params.push(assignedTo); }
  
  if (updates.length > 0) {
    updates.push('updatedAt = CURRENT_TIMESTAMP');
    params.push(req.params.id);
    db.prepare(`UPDATE tickets SET ${updates.join(', ')} WHERE id = ?`).run(...params);
  }
  
  const updatedTicket = db.prepare(`
    SELECT tickets.*, u1.name as userName, u1.email as userEmail, u2.name as agentName
    FROM tickets 
    JOIN users u1 ON tickets.userId = u1.id 
    LEFT JOIN users u2 ON tickets.assignedTo = u2.id
    WHERE tickets.id = ?
  `).get(req.params.id);

  broadcast({ type: 'TICKET_UPDATED', ticket: updatedTicket });
  res.json(updatedTicket);
});

app.get('/api/messages/:ticketId', authenticate, (req: any, res) => {
  const messages = db.prepare(`
    SELECT messages.*, users.name as senderName, users.role as senderRole
    FROM messages
    JOIN users ON messages.senderId = users.id
    WHERE messages.ticketId = ?
    AND (isPrivate = 0 OR ? IN ('admin', 'staff'))
    ORDER BY createdAt ASC
  `).all(req.params.ticketId, req.user.role);
  res.json(messages);
});

app.post('/api/messages', authenticate, (req: any, res) => {
  const { text, ticketId, isPrivate } = req.body;
  const info = db.prepare('INSERT INTO messages (ticketId, senderId, text, isPrivate) VALUES (?, ?, ?, ?)').run(
    ticketId, req.user.id, text, isPrivate ? 1 : 0
  );
  
  const newMessage = db.prepare(`
    SELECT messages.*, users.name as senderName, users.role as senderRole
    FROM messages
    JOIN users ON messages.senderId = users.id
    WHERE messages.id = ?
  `).get(info.lastInsertRowid);

  db.prepare('UPDATE tickets SET updatedAt = CURRENT_TIMESTAMP WHERE id = ?').run(ticketId);

  broadcast({ type: 'NEW_MESSAGE', message: newMessage, ticketId });
  res.json(newMessage);
});

// Global Error Handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
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
