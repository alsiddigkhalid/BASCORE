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
  Menu,
  RefreshCw,
  X
} from 'lucide-react';
import { api, useWebSocket } from '../lib/api';

interface Ticket {
  id: number;
  userId: number;
  assignedTo?: number;
  title: string;
  description: string;
  status: 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  type: 'Question' | 'Incident' | 'Problem' | 'Feature Request';
  createdAt: string;
  updatedAt: string;
  userName?: string;
  userEmail?: string;
  agentName?: string;
}

interface Message {
  id: number;
  ticketId: number;
  senderId: number;
  senderName: string;
  senderRole: string;
  text: string;
  isPrivate: number;
  createdAt: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
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
  const [newTicket, setNewTicket] = useState({ title: '', description: '', category: 'Network', priority: 'medium', type: 'Question', assignedTo: '' });
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'tickets' | 'chat' | 'users'>('tickets');
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const isAdminOrStaff = user.role === 'admin' || user.role === 'staff';
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    type: 'all',
    agent: 'all'
  });
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'updated'>('updated');
  const [users, setUsers] = useState<User[]>([]);
  const [showNewUser, setShowNewUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [newMessage, setNewMessage] = useState('');
  const [isPrivateNote, setIsPrivateNote] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
    if (user.role === 'admin') fetchUsers();
    
    const cleanup = useWebSocket(token, (data) => {
      if (data.type === 'TICKET_CREATED') {
        setTickets(prev => [data.ticket, ...prev]);
      } else if (data.type === 'TICKET_UPDATED') {
        setTickets(prev => prev.map(t => t.id === data.ticket.id ? data.ticket : t));
      } else if (data.type === 'NEW_MESSAGE') {
        if (selectedTicketId === data.ticketId) {
          setMessages(prev => [...prev, data.message]);
        }
      }
    });
    return cleanup;
  }, [selectedTicketId]);

  useEffect(() => {
    if (selectedTicketId) {
      fetchMessages(selectedTicketId);
    }
  }, [selectedTicketId]);

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

  const fetchMessages = async (ticketId: number) => {
    try {
      const data = await api.get(`/messages/${ticketId}`, token);
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await api.get('/auth/users', token); // I need to add this endpoint to server.ts
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/tickets', {
        ...newTicket,
        assignedTo: newTicket.assignedTo ? parseInt(newTicket.assignedTo) : undefined
      }, token);
      setShowNewTicket(false);
      setNewTicket({ title: '', description: '', category: 'Network', priority: 'medium', type: 'Question', assignedTo: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateTicket = async (ticketId: number, data: Partial<Ticket>) => {
    try {
      await api.patch(`/tickets/${ticketId}`, data, token);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedTicketId) return;
    try {
      await api.post('/messages', { 
        text: newMessage, 
        ticketId: selectedTicketId,
        isPrivate: isPrivateNote
      }, token);
      setNewMessage('');
      setIsPrivateNote(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/auth/register', newUser, token);
      setShowNewUser(false);
      setNewUser({ name: '', email: '', password: '', role: 'customer' });
      fetchUsers();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const stats = [
    { label: 'Total Tickets', value: tickets.length, icon: Ticket, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pending', value: tickets.filter(t => t.status === 'open' || t.status === 'pending').length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Resolved', value: tickets.filter(t => t.status === 'resolved').length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const filteredTickets = tickets
    .filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.id.toString().includes(searchQuery);
      const matchesStatus = filters.status === 'all' || t.status === filters.status;
      const matchesPriority = filters.priority === 'all' || t.priority === filters.priority;
      const matchesType = filters.type === 'all' || t.type === filters.type;
      const matchesAgent = filters.agent === 'all' || 
                          (filters.agent === 'unassigned' ? !t.assignedTo : t.assignedTo?.toString() === filters.agent);
      
      return matchesSearch && matchesStatus && matchesPriority && matchesType && matchesAgent;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime();
    });

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'closed': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-700 bg-red-50 border-red-100';
      case 'high': return 'text-orange-700 bg-orange-50 border-orange-100';
      case 'medium': return 'text-blue-700 bg-blue-50 border-blue-100';
      case 'low': return 'text-gray-700 bg-gray-50 border-gray-100';
      default: return 'text-gray-700 bg-gray-50 border-gray-100';
    }
  };

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
                  <button 
                    onClick={() => { setActiveTab('users'); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'users' ? 'bg-[#f1c232]/10 text-[#f1c232]' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
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
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'users' ? 'bg-[#f1c232]/10 text-[#f1c232]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
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
                          {isAdminOrStaff ? 'All Support Tickets' : 'Your Support Tickets'}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {isAdminOrStaff ? 'Manage and update customer requests' : 'Track and manage your active requests'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => { setLoading(true); fetchTickets(); }}
                          className="p-2 hover:bg-gray-50 rounded-xl transition-all text-gray-500 border border-gray-100"
                          title="Refresh Tickets"
                        >
                          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        {!isAdminOrStaff && (
                          <button 
                            onClick={() => setShowNewTicket(true)}
                            className="bg-[#f1c232] text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#d9af2d] transition-all shadow-sm"
                          >
                            <Plus className="w-5 h-5" /> New Ticket
                          </button>
                        )}
                      </div>
                    </div>

                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text"
                        placeholder="Search tickets by ID, title, or customer..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#f1c232] text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <select 
                        className="text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#f1c232]"
                        value={filters.status}
                        onChange={(e) => setFilters({...filters, status: e.target.value})}
                      >
                        <option value="all">All Statuses</option>
                        <option value="open">Open</option>
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                      <select 
                        className="text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#f1c232]"
                        value={filters.priority}
                        onChange={(e) => setFilters({...filters, priority: e.target.value})}
                      >
                        <option value="all">All Priorities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                      <select 
                        className="text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#f1c232]"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                      >
                        <option value="updated">Last Updated</option>
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                      {(filters.status !== 'all' || filters.priority !== 'all' || searchQuery) && (
                        <button 
                          onClick={() => {
                            setFilters({ status: 'all', priority: 'all', type: 'all', agent: 'all' });
                            setSearchQuery('');
                          }}
                          className="text-xs text-gray-500 hover:text-[#f1c232] font-medium"
                        >
                          Reset Filters
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-gray-50 text-gray-500 text-[11px] uppercase tracking-wider border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 font-bold">Ticket</th>
                          <th className="px-6 py-3 font-bold">Status</th>
                          <th className="px-6 py-3 font-bold">Priority</th>
                          <th className="px-6 py-3 font-bold">Agent</th>
                          <th className="px-6 py-3 font-bold">Last Updated</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {loading ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center">
                              <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#f1c232]" />
                              <p className="text-gray-500 mt-2">Loading tickets...</p>
                            </td>
                          </tr>
                        ) : filteredTickets.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center">
                              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Ticket className="w-8 h-8 text-gray-300" />
                              </div>
                              <p className="text-gray-900 font-bold">No tickets found</p>
                              <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
                            </td>
                          </tr>
                        ) : (
                          filteredTickets.map((ticket) => (
                            <tr 
                              key={ticket.id} 
                              onClick={() => { setSelectedTicketId(ticket.id); setActiveTab('chat'); }}
                              className="hover:bg-[#f9fafb] transition-colors group cursor-pointer border-b border-gray-50"
                            >
                              <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-gray-400">#{ticket.id}</span>
                                    <p className="text-sm font-bold text-gray-900 group-hover:text-[#f1c232] transition-colors">{ticket.title}</p>
                                  </div>
                                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                                    <span className="font-medium">{ticket.userName}</span>
                                    <span>•</span>
                                    <span>{ticket.type}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full border ${getStatusColor(ticket.status)}`}>
                                  {ticket.status}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${getPriorityColor(ticket.priority)}`}>
                                  {ticket.priority}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-600 border border-gray-200">
                                    {ticket.agentName ? ticket.agentName[0] : '?'}
                                  </div>
                                  <span className="text-xs text-gray-600">{ticket.agentName || 'Unassigned'}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-xs text-gray-500">
                                {formatTime(ticket.updatedAt || ticket.createdAt)}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : activeTab === 'chat' ? (
              /* Freshworks-style Ticket Detail View */
              <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-160px)]">
                {/* Main Conversation Area */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                  {!selectedTicketId ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                      <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                        <MessageSquare className="w-10 h-10 text-gray-300" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">No Ticket Selected</h3>
                      <p className="text-gray-500 max-w-xs mx-auto mt-2">
                        Please select a ticket from the dashboard to view the conversation.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Ticket Header */}
                      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => setSelectedTicketId(null)}
                            className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"
                          >
                            <ChevronRight className="w-5 h-5 rotate-180" />
                          </button>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-gray-400">#{selectedTicketId}</span>
                              <h2 className="text-lg font-bold text-gray-900">
                                {tickets.find(t => t.id === selectedTicketId)?.title}
                              </h2>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${getStatusColor(tickets.find(t => t.id === selectedTicketId)?.status || '')}`}>
                                {tickets.find(t => t.id === selectedTicketId)?.status}
                              </span>
                              <span className="text-[11px] text-gray-400">
                                Created {formatTime(tickets.find(t => t.id === selectedTicketId)?.createdAt || '')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Messages Area */}
                      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f9fafb]">
                        {/* Original Description as first message */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#f1c232]/20 rounded-full flex items-center justify-center font-bold text-[#f1c232]">
                                {tickets.find(t => t.id === selectedTicketId)?.userName?.[0]}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-900">{tickets.find(t => t.id === selectedTicketId)?.userName}</p>
                                <p className="text-[11px] text-gray-500">Reported this issue</p>
                              </div>
                            </div>
                            <span className="text-[11px] text-gray-400">{formatTime(tickets.find(t => t.id === selectedTicketId)?.createdAt || '')}</span>
                          </div>
                          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {tickets.find(t => t.id === selectedTicketId)?.description}
                          </div>
                        </div>

                        {messages.map((msg) => (
                          <div 
                            key={msg.id} 
                            className={`p-6 rounded-xl border shadow-sm ${
                              msg.isPrivate 
                                ? 'bg-amber-50 border-amber-100' 
                                : 'bg-white border-gray-100'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                  msg.senderRole === 'customer' ? 'bg-blue-100 text-blue-600' : 'bg-[#f1c232] text-black'
                                }`}>
                                  {msg.senderName[0]}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-bold text-gray-900">{msg.senderName}</p>
                                    {msg.isPrivate === 1 && (
                                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-amber-200 text-amber-800 rounded">Private Note</span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-gray-500 capitalize">{msg.senderRole}</p>
                                </div>
                              </div>
                              <span className="text-[11px] text-gray-400">{formatTime(msg.createdAt)}</span>
                            </div>
                            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Reply Area */}
                      <div className="p-6 bg-white border-t border-gray-100">
                        <div className="flex items-center gap-4 mb-4">
                          <button 
                            onClick={() => setIsPrivateNote(false)}
                            className={`text-sm font-bold pb-2 border-b-2 transition-colors ${!isPrivateNote ? 'border-[#f1c232] text-[#f1c232]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                          >
                            Reply
                          </button>
                          {isAdminOrStaff && (
                            <button 
                              onClick={() => setIsPrivateNote(true)}
                              className={`text-sm font-bold pb-2 border-b-2 transition-colors ${isPrivateNote ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                            >
                              Add Note
                            </button>
                          )}
                        </div>
                        <form onSubmit={handleSendMessage} className="space-y-4">
                          <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={isPrivateNote ? "Type a private note (only visible to agents)..." : "Type your response here..."}
                            className={`w-full p-4 rounded-xl border outline-none focus:ring-2 transition-all resize-none ${
                              isPrivateNote 
                                ? 'bg-amber-50 border-amber-200 focus:ring-amber-500' 
                                : 'bg-gray-50 border-gray-200 focus:ring-[#f1c232]'
                            }`}
                            rows={3}
                          />
                          <div className="flex justify-end">
                            <button 
                              type="submit"
                              disabled={!newMessage.trim()}
                              className={`px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50 ${
                                isPrivateNote 
                                  ? 'bg-amber-500 text-white hover:bg-amber-600' 
                                  : 'bg-[#f1c232] text-black hover:bg-[#d9af2d]'
                              }`}
                            >
                              {isPrivateNote ? 'Add Private Note' : 'Send Reply'}
                            </button>
                          </div>
                        </form>
                      </div>
                    </>
                  )}
                </div>

                {/* Right Sidebar - Properties & Contact */}
                {selectedTicketId && (
                  <div className="w-full lg:w-80 space-y-6 overflow-y-auto">
                    {/* Ticket Properties */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Ticket Properties</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Status</label>
                          {isAdminOrStaff ? (
                            <select 
                              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#f1c232]"
                              value={tickets.find(t => t.id === selectedTicketId)?.status}
                              onChange={(e) => handleUpdateTicket(selectedTicketId, { status: e.target.value as any })}
                            >
                              <option value="open">Open</option>
                              <option value="pending">Pending</option>
                              <option value="resolved">Resolved</option>
                              <option value="closed">Closed</option>
                            </select>
                          ) : (
                            <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full border inline-block ${getStatusColor(tickets.find(t => t.id === selectedTicketId)?.status || '')}`}>
                              {tickets.find(t => t.id === selectedTicketId)?.status}
                            </span>
                          )}
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Priority</label>
                          {isAdminOrStaff ? (
                            <select 
                              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#f1c232]"
                              value={tickets.find(t => t.id === selectedTicketId)?.priority}
                              onChange={(e) => handleUpdateTicket(selectedTicketId, { priority: e.target.value as any })}
                            >
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                              <option value="urgent">Urgent</option>
                            </select>
                          ) : (
                            <span className={`text-xs font-bold uppercase px-2 py-1 rounded border inline-block ${getPriorityColor(tickets.find(t => t.id === selectedTicketId)?.priority || '')}`}>
                              {tickets.find(t => t.id === selectedTicketId)?.priority}
                            </span>
                          )}
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Type</label>
                          {isAdminOrStaff ? (
                            <select 
                              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#f1c232]"
                              value={tickets.find(t => t.id === selectedTicketId)?.type}
                              onChange={(e) => handleUpdateTicket(selectedTicketId, { type: e.target.value as any })}
                            >
                              <option value="Question">Question</option>
                              <option value="Incident">Incident</option>
                              <option value="Problem">Problem</option>
                              <option value="Feature Request">Feature Request</option>
                            </select>
                          ) : (
                            <span className="text-sm text-gray-700 font-medium">{tickets.find(t => t.id === selectedTicketId)?.type}</span>
                          )}
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">Agent</label>
                          {user.role === 'admin' ? (
                            <select 
                              className="w-full text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#f1c232]"
                              value={tickets.find(t => t.id === selectedTicketId)?.assignedTo || ''}
                              onChange={(e) => handleUpdateTicket(selectedTicketId, { assignedTo: e.target.value ? parseInt(e.target.value) : null })}
                            >
                              <option value="">Unassigned</option>
                              {users.filter(u => u.role === 'staff' || u.role === 'admin').map(agent => (
                                <option key={agent.id} value={agent.id}>{agent.name}</option>
                              ))}
                            </select>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-600 border border-gray-200">
                                {tickets.find(t => t.id === selectedTicketId)?.agentName?.[0] || '?'}
                              </div>
                              <span className="text-sm text-gray-700 font-medium">{tickets.find(t => t.id === selectedTicketId)?.agentName || 'Unassigned'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Contact Details</h3>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-xl">
                          {tickets.find(t => t.id === selectedTicketId)?.userName?.[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{tickets.find(t => t.id === selectedTicketId)?.userName}</p>
                          <p className="text-xs text-gray-500">Customer</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Shield className="w-4 h-4" />
                          <span className="text-xs truncate">{tickets.find(t => t.id === selectedTicketId)?.userEmail}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Activity className="w-4 h-4" />
                          <span className="text-xs">Joined {formatTime(new Date().toISOString())}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : activeTab === 'users' && user.role === 'admin' ? (
              /* User Management Section */
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">User Management</h2>
                    <p className="text-sm text-gray-500">Create and manage staff and customer accounts</p>
                  </div>
                  <button 
                    onClick={() => setShowNewUser(true)}
                    className="bg-[#f1c232] text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-[#d9af2d] transition-all"
                  >
                    <Plus className="w-5 h-5" /> Add User
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Name</th>
                        <th className="px-6 py-4 font-semibold">Email</th>
                        <th className="px-6 py-4 font-semibold">Role</th>
                        <th className="px-6 py-4 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">{u.name}</td>
                          <td className="px-6 py-4 text-gray-600">{u.email}</td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-bold uppercase px-2 py-1 rounded-md ${
                              u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                              u.role === 'staff' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-gray-400 hover:text-red-600 transition-colors">
                              <X className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <Shield className="w-16 h-16 mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">Access Restricted</h3>
                <p className="text-gray-500">This section is only available for authorized BASCORE personnel.</p>
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
                    <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                    <select
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f1c232] outline-none"
                      value={newTicket.type}
                      onChange={(e) => setNewTicket({ ...newTicket, type: e.target.value as any })}
                    >
                      <option>Question</option>
                      <option>Incident</option>
                      <option>Problem</option>
                      <option>Feature Request</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                {user.role === 'admin' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Assign Agent (Optional)</label>
                    <select
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f1c232] outline-none"
                      value={newTicket.assignedTo}
                      onChange={(e) => setNewTicket({ ...newTicket, assignedTo: e.target.value })}
                    >
                      <option value="">Auto-assign random agent</option>
                      {users.filter(u => u.role === 'staff' || u.role === 'admin').map(agent => (
                        <option key={agent.id} value={agent.id}>{agent.name} ({agent.role})</option>
                      ))}
                    </select>
                  </div>
                )}
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
      {/* New User Modal */}
      <AnimatePresence>
        {showNewUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Create New User</h3>
                <button onClick={() => setShowNewUser(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleCreateUser} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f1c232] outline-none"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f1c232] outline-none"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f1c232] outline-none"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Role</label>
                  <select
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f1c232] outline-none"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    <option value="customer">Customer</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#f1c232] text-black font-bold py-3 rounded-xl hover:bg-[#d9af2d] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create User'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
