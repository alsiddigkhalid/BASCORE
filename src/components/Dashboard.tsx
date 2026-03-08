import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Ticket, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Search,
  Filter,
  LogOut,
  ChevronRight,
  Activity,
  Shield,
  Zap,
  Loader2,
  Users,
  Menu
} from 'lucide-react';
import { api, useWebSocket } from '../lib/api';

interface Ticket {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  category: string;
  createdAt: string;
  userName?: string;
  userEmail?: string;
}

interface Message {
  id: number;
  senderId: number;
  senderName: string;
  senderRole: string;
  text: string;
  createdAt: string;
}

interface DashboardProps {
  user: any;
  token: string;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, token, onLogout }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: '', description: '', category: 'Network', priority: 'medium' });
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'tickets' | 'chat'>('tickets');
  const [newMessage, setNewMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
    fetchMessages();
    const cleanup = useWebSocket(token, (data) => {
      if (data.type === 'TICKET_CREATED') {
        setTickets(prev => [data.ticket, ...prev]);
      } else if (data.type === 'TICKET_UPDATED') {
        setTickets(prev => prev.map(t => t.id === data.ticket.id ? data.ticket : t));
      } else if (data.type === 'NEW_MESSAGE') {
        setMessages(prev => [...prev, data.message]);
      }
    });
    return cleanup;
  }, []);

  const fetchTickets = async () => {
    try {
      const data = await api.get('/tickets', token);
      setTickets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const data = await api.get('/messages', token);
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/tickets', newTicket, token);
      setShowNewTicket(false);
      setNewTicket({ title: '', description: '', category: 'Network', priority: 'medium' });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStatus = async (ticketId: number, status: string) => {
    try {
      await api.patch(`/tickets/${ticketId}`, { status }, token);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      await api.post('/messages', { text: newMessage }, token);
      setNewMessage('');
    } catch (err) {
      console.error(err);
    }
  };

  const stats = [
    { label: 'Total Tickets', value: tickets.length, icon: Ticket, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active', value: tickets.filter(t => t.status === 'open' || t.status === 'in-progress').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Resolved', value: tickets.filter(t => t.status === 'resolved').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const isAdminOrStaff = user.role === 'admin' || user.role === 'staff';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[110] lg:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-white z-[120] lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#f1c232] rounded-lg flex items-center justify-center font-bold text-black">B</div>
                  <span className="font-bold text-xl tracking-tight">BASCORE</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex-1 p-4 space-y-2">
                <button 
                  onClick={() => { setActiveTab('tickets'); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'tickets' ? 'bg-[#f1c232]/10 text-[#f1c232]' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Activity className="w-5 h-5" /> Dashboard
                </button>
                {isAdminOrStaff && (
                  <button 
                    onClick={() => { setActiveTab('chat'); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'chat' ? 'bg-[#f1c232]/10 text-[#f1c232]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <MessageSquare className="w-5 h-5" /> Internal Chat
                  </button>
                )}
                {user.role === 'admin' && (
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                    <Users className="w-5 h-5" /> Team Members
                  </button>
                )}
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                  <Shield className="w-5 h-5" /> Security
                </button>
              </nav>

              <div className="p-4 border-t border-gray-100">
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:flex flex-col">
        <div className="p-6 border-bottom border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#f1c232] rounded-lg flex items-center justify-center font-bold text-black">B</div>
            <span className="font-bold text-xl tracking-tight">BASCORE</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('tickets')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'tickets' ? 'bg-[#f1c232]/10 text-[#f1c232]' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Activity className="w-5 h-5" /> Dashboard
          </button>
          {isAdminOrStaff && (
            <button 
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'chat' ? 'bg-[#f1c232]/10 text-[#f1c232]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <MessageSquare className="w-5 h-5" /> Internal Chat
            </button>
          )}
          {user.role === 'admin' && (
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
              <Users className="w-5 h-5" /> Team Members
            </button>
          )}
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
            <Shield className="w-5 h-5" /> Security
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-gray-400 hover:text-gray-600 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">
              {isAdminOrStaff ? 'Staff Management Portal' : 'Customer Support Portal'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 uppercase">{user.role}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 border border-gray-200">
              {user.name[0]}
            </div>
            <button 
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-red-600 lg:hidden transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {activeTab === 'tickets' ? (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
                    >
                      <div className={`${stat.bg} p-3 rounded-xl`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Tickets Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {isAdminOrStaff ? 'All Support Tickets' : 'Recent Support Tickets'}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {isAdminOrStaff ? 'Manage and update customer requests' : 'Manage and track your active requests'}
                      </p>
                    </div>
                    {!isAdminOrStaff && (
                      <button 
                        onClick={() => setShowNewTicket(true)}
                        className="bg-[#f1c232] text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#d9af2d] transition-all"
                      >
                        <Plus className="w-5 h-5" /> New Ticket
                      </button>
                    )}
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-4 font-semibold">Ticket Details</th>
                          {isAdminOrStaff && <th className="px-6 py-4 font-semibold">Customer</th>}
                          <th className="px-6 py-4 font-semibold">Category</th>
                          <th className="px-6 py-4 font-semibold">Priority</th>
                          <th className="px-6 py-4 font-semibold">Status</th>
                          <th className="px-6 py-4 font-semibold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {loading ? (
                          <tr>
                            <td colSpan={isAdminOrStaff ? 7 : 6} className="px-6 py-12 text-center">
                              <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#f1c232]" />
                              <p className="text-gray-500 mt-2">Loading tickets...</p>
                            </td>
                          </tr>
                        ) : tickets.length === 0 ? (
                          <tr>
                            <td colSpan={isAdminOrStaff ? 7 : 6} className="px-6 py-12 text-center">
                              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Ticket className="w-8 h-8 text-gray-300" />
                              </div>
                              <p className="text-gray-900 font-bold">No tickets found</p>
                            </td>
                          </tr>
                        ) : (
                          tickets.map((ticket) => (
                            <tr key={ticket.id} className="hover:bg-gray-50 transition-colors group">
                              <td className="px-6 py-4">
                                <p className="text-sm font-bold text-gray-900">{ticket.title}</p>
                                <p className="text-xs text-gray-500 truncate max-w-[200px]">{ticket.description}</p>
                              </td>
                              {isAdminOrStaff && (
                                <td className="px-6 py-4">
                                  <p className="text-sm font-medium text-gray-900">{ticket.userName}</p>
                                  <p className="text-xs text-gray-500">{ticket.userEmail}</p>
                                </td>
                              )}
                              <td className="px-6 py-4">
                                <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                                  {ticket.category}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`text-xs font-bold uppercase tracking-tight ${
                                  ticket.priority === 'high' ? 'text-red-600' : 
                                  ticket.priority === 'medium' ? 'text-amber-600' : 'text-blue-600'
                                }`}>
                                  {ticket.priority}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                {isAdminOrStaff ? (
                                  <select 
                                    className="text-sm bg-white border border-gray-200 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-[#f1c232]"
                                    value={ticket.status}
                                    onChange={(e) => handleUpdateStatus(ticket.id, e.target.value)}
                                  >
                                    <option value="open">Open</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                    <option value="closed">Closed</option>
                                  </select>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${
                                      ticket.status === 'resolved' ? 'bg-emerald-500' :
                                      ticket.status === 'in-progress' ? 'bg-amber-500' : 'bg-blue-500'
                                    }`} />
                                    <span className="text-sm font-medium text-gray-700 capitalize">
                                      {ticket.status.replace('-', ' ')}
                                    </span>
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-400 hover:text-[#f1c232]">
                                  <ChevronRight className="w-5 h-5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : isAdminOrStaff ? (
              /* Chat Section */
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[calc(100vh-200px)]">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900">Internal Team Chat</h2>
                  <p className="text-sm text-gray-500">Collaborate with staff and admins in real-time</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col ${msg.senderId === user.id ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-900">{msg.senderName}</span>
                        <span className="text-[10px] uppercase bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">
                          {msg.senderRole}
                        </span>
                      </div>
                      <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                        msg.senderId === user.id 
                          ? 'bg-[#f1c232] text-black rounded-tr-none' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-100 flex gap-4">
                  <input 
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#f1c232]"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="bg-[#f1c232] text-black px-6 py-2 rounded-xl font-bold hover:bg-[#d9af2d] transition-all"
                  >
                    Send
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <Shield className="w-16 h-16 mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Access Restricted</h3>
                <p className="text-gray-500">This section is only available for BASCORE staff and administrators.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* New Ticket Modal */}
      <AnimatePresence>
        {showNewTicket && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Open New Support Ticket</h3>
                <button onClick={() => setShowNewTicket(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleCreateTicket} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Issue Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Network connectivity issue in Office A"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f1c232] outline-none"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                    <select
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f1c232] outline-none"
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                    >
                      <option>Network</option>
                      <option>Fiber Optic</option>
                      <option>ELV Systems</option>
                      <option>Wireless</option>
                      <option>Cabling</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Priority</label>
                    <select
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f1c232] outline-none"
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as any })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Please describe the issue in detail..."
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f1c232] outline-none resize-none"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#f1c232] text-black font-bold py-3 rounded-xl hover:bg-[#d9af2d] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Ticket'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const X = ({ className, onClick }: { className?: string, onClick?: () => void }) => (
  <svg 
    onClick={onClick}
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
