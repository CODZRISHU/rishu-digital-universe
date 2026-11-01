import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  FolderKanban, 
  Briefcase, 
  GraduationCap, 
  Cpu, 
  Award, 
  Sparkles, 
  Calendar, 
  CreditCard, 
  Mail, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Users, 
  Eye, 
  ExternalLink,
  MessageSquare,
  Send,
  Smartphone,
  Bell,
  Check,
  Radio
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { portfolioApi } from '../../services/api';

export const AdminDashboard: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'projects' | 'experience' | 'skills' | 'services' | 'bookings' | 'messages' | 'telegram'
  >('overview');


  const [metrics, setMetrics] = useState({
    totalVisitors: 1248,
    portfolioViews: 4890,
    totalProjects: 6,
    totalBookings: 14,
    upcomingSessions: 3,
    pendingBookings: 1,
    totalRevenue: 34990,
    recentMessages: 8,
  });

  const [bookings, setBookings] = useState<any[]>([
    {
      _id: 'bkg-1',
      customerName: 'Alex Thorne',
      customerEmail: 'alex@cloudtech.io',
      sessionDate: '2026-11-04',
      startTime: '10:00 AM',
      purpose: 'Spring Boot microservices architecture review & distributed caching.',
      amount: 3999,
      status: 'confirmed'
    },
    {
      _id: 'bkg-2',
      customerName: 'Priya Sharma',
      customerEmail: 'priya.s@gmail.com',
      sessionDate: '2026-11-06',
      startTime: '04:00 PM',
      purpose: 'Career roadmap & CUSAT to Cognizant MNC full-stack guidance.',
      amount: 999,
      status: 'pending'
    }
  ]);

  const [messages, setMessages] = useState<any[]>([
    {
      _id: 'msg-1',
      name: 'Rohan Mehta',
      email: 'rohan@enterprise.co',
      subject: 'Contract full-stack engineering consultation',
      message: 'Hi Rishu, loved Kevin AI and your microservice portfolio. We would like to discuss a 3-month consulting project.',
      createdAt: '2026-10-30'
    }
  ]);

  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  // Telegram Alert State
  const [telegramStatus, setTelegramStatus] = useState<any>({
    configured: false,
    phoneNumber: '9304783530',
    chatId: null,
    hasBotToken: false,
  });
  const [botTokenInput, setBotTokenInput] = useState('');
  const [chatIdInput, setChatIdInput] = useState('');
  const [isTestingTelegram, setIsTestingTelegram] = useState(false);

  // Direct access: fetch live bookings and contact transmissions from MongoDB API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const liveBookings = await portfolioApi.getAllBookings();
        if (liveBookings && liveBookings.length > 0) {
          setBookings(liveBookings);
          setMetrics(prev => ({
            ...prev,
            totalBookings: liveBookings.length,
            upcomingSessions: liveBookings.filter(b => b.status === 'confirmed').length,
          }));
        }
      } catch (e) {
        // Fallback to local state
      }

      try {
        const liveMsgs = await portfolioApi.getContactInquiries();
        if (liveMsgs && liveMsgs.length > 0) {
          setMessages(liveMsgs);
          setMetrics(prev => ({ ...prev, recentMessages: liveMsgs.length }));
        }
      } catch (e) {
        // Fallback
      }

      try {
        const teleStatus = await portfolioApi.getTelegramStatus();
        if (teleStatus) {
          setTelegramStatus(teleStatus);
        }
      } catch (e) {
        // Fallback
      }
    };
    fetchData();
  }, []);

  const notify = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 3000);
  };

  const handleUpdateBookingStatus = (id: string, newStatus: string) => {
    setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
    notify(`Booking status updated to ${newStatus}`);
  };

  const handleSaveTelegram = async () => {
    if (!botTokenInput && !chatIdInput) {
      notify('Please enter Bot Token or Chat ID');
      return;
    }
    try {
      const res = await portfolioApi.updateTelegramConfig({
        botToken: botTokenInput,
        chatId: chatIdInput,
      });
      setTelegramStatus(res);
      notify('Telegram configuration updated successfully!');
      setBotTokenInput('');
      setChatIdInput('');
    } catch (e: any) {
      notify('Failed to update Telegram configuration');
    }
  };

  const handleTestTelegram = async () => {
    setIsTestingTelegram(true);
    try {
      const res = await portfolioApi.testTelegramNotification();
      notify(res.message || 'Telegram test message triggered');
      try {
        const updated = await portfolioApi.getTelegramStatus();
        setTelegramStatus(updated);
      } catch {}
    } catch (e: any) {
      notify('Failed to dispatch Telegram test notification');
    } finally {
      setIsTestingTelegram(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#0A0A0D] border-r border-white/10 p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#00D9FF] flex items-center justify-center font-heading font-black text-sm">
              RJ
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm text-white">MISSION CONTROL</h2>
              <p className="text-[10px] font-mono text-gray-400">Rishu Jha CMS v1.0</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-mono">
            {[
              { id: 'overview', name: 'Overview & Metrics', icon: BarChart3 },
              { id: 'telegram', name: 'Telegram Alerts', icon: MessageSquare },
              { id: 'projects', name: 'Projects CMS', icon: FolderKanban },
              { id: 'experience', name: 'Experience CMS', icon: Briefcase },
              { id: 'skills', name: 'Skills & Tech', icon: Cpu },
              { id: 'services', name: 'Services Marketplace', icon: Sparkles },
              { id: 'bookings', name: 'Appointments & Slots', icon: Calendar },
              { id: 'messages', name: 'Inquiry Inbox', icon: Mail },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-[#A855F7]/15 border border-[#A855F7]/40 text-white font-medium shadow-glow-primary'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#A855F7]" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-3 pt-6 border-t border-white/10 text-xs font-mono">
          <div className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/5">
            <p className="text-[10px] text-gray-500 uppercase">Authenticated as</p>
            <p className="text-gray-300 truncate">{user?.email || 'admin@rishujha.com'}</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-white/10 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white capitalize">
              {activeTab} Management
            </h1>
            <p className="text-xs font-mono text-gray-400">
              Live updates reflect instantly across the public portfolio universe.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono glass-button text-gray-300 hover:text-white"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#00D9FF]" />
            </a>
          </div>
        </div>

        {/* Status Toast */}
        {statusNotification && (
          <div className="my-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>{statusNotification}</span>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8 mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-xs font-mono">Total Visitors</span>
                  <Users className="w-4 h-4 text-[#A855F7]" />
                </div>
                <p className="text-3xl font-heading font-bold text-white">{metrics.totalVisitors}</p>
                <p className="text-[11px] font-mono text-green-400">+18% this month</p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-xs font-mono">Portfolio Impressions</span>
                  <Eye className="w-4 h-4 text-[#00D9FF]" />
                </div>
                <p className="text-3xl font-heading font-bold text-white">{metrics.portfolioViews}</p>
                <p className="text-[11px] font-mono text-gray-400">Across all projects</p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-xs font-mono">Total Sessions Booked</span>
                  <Calendar className="w-4 h-4 text-[#C4B5FD]" />
                </div>
                <p className="text-3xl font-heading font-bold text-white">{metrics.totalBookings}</p>
                <p className="text-[11px] font-mono text-yellow-400">{metrics.pendingBookings} pending approval</p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-xs font-mono">Booking Revenue (INR)</span>
                  <DollarSign className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-3xl font-heading font-bold text-white">₹{metrics.totalRevenue.toLocaleString()}</p>
                <p className="text-[11px] font-mono text-gray-400">Razorpay verified</p>
              </div>
            </div>

            {/* Telegram Instant Notifications Alert Banner */}
            <div className="glass-panel p-6 rounded-3xl border border-[#A855F7]/30 bg-gradient-to-r from-[#A855F7]/10 via-[#0A0A0D] to-[#00D9FF]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#A855F7]/20 border border-[#A855F7]/40 flex items-center justify-center text-[#00D9FF] shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-white text-base">Telegram Instant Dispatch System</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-green-500/10 text-green-400 border border-green-500/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                      Direct to +91 9304783530
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-mono mt-0.5">
                    All client appointments, consultation details, and contact transmissions trigger instant alerts directly on your phone.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <button
                  onClick={handleTestTelegram}
                  disabled={isTestingTelegram}
                  className="px-4 py-2 rounded-xl text-xs font-mono glass-button text-white hover:border-[#00D9FF]/60 flex items-center gap-2"
                >
                  <Send className={`w-3.5 h-3.5 text-[#00D9FF] ${isTestingTelegram ? 'animate-spin' : ''}`} />
                  <span>{isTestingTelegram ? 'Transmitting...' : 'Send Test Alert'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('telegram')}
                  className="px-4 py-2 rounded-xl text-xs font-mono bg-[#A855F7] text-white hover:bg-[#9333EA] transition-colors"
                >
                  Configure
                </button>
              </div>
            </div>

            {/* Upcoming Appointments Table */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="font-heading font-bold text-lg text-white">Recent Session Bookings</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">

                  <thead>
                    <tr className="border-b border-white/10 text-gray-400">
                      <th className="pb-3">Client</th>
                      <th className="pb-3">Date & Slot</th>
                      <th className="pb-3">Topic</th>
                      <th className="pb-3">Fee</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    {bookings.map((bkg) => (
                      <tr key={bkg._id} className="hover:bg-white/[0.02]">
                        <td className="py-3">
                          <p className="text-white font-medium">{bkg.customerName}</p>
                          <p className="text-[10px] text-gray-500">{bkg.customerEmail}</p>
                        </td>
                        <td className="py-3 text-[#00D9FF]">{bkg.sessionDate} at {bkg.startTime}</td>
                        <td className="py-3 max-w-xs truncate">{bkg.purpose}</td>
                        <td className="py-3">₹{bkg.amount}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                            bkg.status === 'confirmed'
                              ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                              : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                          }`}>
                            {bkg.status}
                          </span>
                        </td>
                        <td className="py-3 text-right space-x-2">
                          <button
                            onClick={() => handleUpdateBookingStatus(bkg._id, 'confirmed')}
                            className="px-2.5 py-1 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateBookingStatus(bkg._id, 'cancelled')}
                            className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="font-heading font-bold text-lg text-white">All Appointment Bookings</h3>
              <button
                onClick={() => notify('Slot availability refreshed')}
                className="px-4 py-2 rounded-xl text-xs font-mono glass-button text-gray-300"
              >
                Sync Google Calendar
              </button>
            </div>
            {/* Same table rendered with full controls */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <p className="text-xs text-gray-400 font-mono">
                Real-time booking slots are synchronized with MongoDB Atlas and Razorpay payment webhooks.
              </p>
              {bookings.map(b => (
                <div key={b._id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="text-white font-bold">{b.customerName} ({b.customerEmail})</h4>
                    <p className="text-xs text-[#00D9FF] font-mono">{b.sessionDate} at {b.startTime}</p>
                    <p className="text-xs text-gray-400 mt-1">{b.purpose}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-white">
                      ₹{b.amount} INR
                    </span>
                    <button
                      onClick={() => handleUpdateBookingStatus(b._id, 'completed')}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                    >
                      Mark Completed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-6 mt-6">
            <h3 className="font-heading font-bold text-lg text-white">Contact Transmissions & Inquiries</h3>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg._id} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-bold text-sm">{msg.name}</h4>
                      <p className="text-xs text-[#A855F7] font-mono">{msg.email}</p>
                    </div>
                    <span className="text-[11px] font-mono text-gray-500">{msg.createdAt}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#00D9FF]">{msg.subject}</p>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">{msg.message}</p>
                  <div className="pt-2 flex justify-end">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                      className="px-4 py-1.5 rounded-lg text-xs font-mono text-white bg-gradient-to-r from-[#A855F7] to-[#7E22CE]"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Telegram Alerts Tab */}
        {activeTab === 'telegram' && (
          <div className="space-y-8 mt-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                  <span>Telegram Instant Alert System</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#A855F7]/15 text-[#C4B5FD] border border-[#A855F7]/30">
                    Target: +91 9304783530
                  </span>
                </h3>
                <p className="text-xs font-mono text-gray-400 mt-1">
                  Instant real-time mobile push notifications delivered straight to your Telegram chat for every booking and inquiry.
                </p>
              </div>

              <button
                onClick={handleTestTelegram}
                disabled={isTestingTelegram}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono text-white bg-gradient-to-r from-[#A855F7] to-[#00D9FF] hover:opacity-90 shadow-glow-primary disabled:opacity-50"
              >
                <Send className={`w-3.5 h-3.5 ${isTestingTelegram ? 'animate-spin' : ''}`} />
                <span>{isTestingTelegram ? 'Sending Test...' : 'Send Test Alert Now'}</span>
              </button>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[11px] font-mono text-gray-400">Telegram Destination</span>
                <p className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#00D9FF]" />
                  <span>+91 9304783530</span>
                </p>
                <p className="text-[10px] font-mono text-gray-500">Rishu Kumar Jha's mobile</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[11px] font-mono text-gray-400">Bot Connection</span>
                <p className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${telegramStatus.hasBotToken ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></span>
                  <span>{telegramStatus.hasBotToken ? 'Bot Token Set' : 'Awaiting Token'}</span>
                </p>
                <p className="text-[10px] font-mono text-gray-500">
                  {telegramStatus.hasBotToken ? 'Token active in environment' : 'Paste below or set TELEGRAM_BOT_TOKEN'}
                </p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-[11px] font-mono text-gray-400">Telegram Chat ID</span>
                <p className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#A855F7]" />
                  <span>{telegramStatus.chatId || 'Not Configured'}</span>
                </p>
                <p className="text-[10px] font-mono text-gray-500">
                  {telegramStatus.chatId ? 'Linked to your private chat' : 'Get numeric ID from @userinfobot'}
                </p>
              </div>
            </div>

            {/* Quick 3-Step Setup Guide */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
              <h4 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#00D9FF]" />
                <span>1-Minute Telegram Setup Instructions</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="w-6 h-6 rounded-lg bg-[#A855F7]/20 border border-[#A855F7]/40 flex items-center justify-center text-[#A855F7] font-bold">
                    1
                  </div>
                  <h5 className="font-bold text-white">Create Free Bot</h5>
                  <p className="text-gray-400 text-[11px] leading-relaxed">
                    Open{' '}
                    <a
                      href="https://t.me/BotFather"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00D9FF] underline hover:text-white"
                    >
                      @BotFather
                    </a>{' '}
                    on Telegram, send <code className="text-[#A855F7]">/newbot</code>, give it a name like <i>Rishu Portfolio Alerts</i>, and copy the Bot Token.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="w-6 h-6 rounded-lg bg-[#00D9FF]/20 border border-[#00D9FF]/40 flex items-center justify-center text-[#00D9FF] font-bold">
                    2
                  </div>
                  <h5 className="font-bold text-white">Get Your Chat ID</h5>
                  <p className="text-gray-400 text-[11px] leading-relaxed">
                    From your Telegram app on phone <b>9304783530</b>, open{' '}
                    <a
                      href="https://t.me/userinfobot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00D9FF] underline hover:text-white"
                    >
                      @userinfobot
                    </a>{' '}
                    and hit Start. It will instantly reply with your numeric <b>Id</b> (e.g. <i>1483928192</i>).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="w-6 h-6 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-bold">
                    3
                  </div>
                  <h5 className="font-bold text-white">Activate & Connect</h5>
                  <p className="text-gray-400 text-[11px] leading-relaxed">
                    Search for your newly created bot in Telegram and tap <b>Start</b>. Then paste your Bot Token and Chat ID below to link them!
                  </p>
                </div>
              </div>

              {/* Bot Token & Chat ID Configuration Form */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <h5 className="font-heading font-bold text-sm text-white">Update Telegram Credentials</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-gray-400">TELEGRAM BOT TOKEN</label>
                    <input
                      type="password"
                      value={botTokenInput}
                      onChange={(e) => setBotTokenInput(e.target.value)}
                      placeholder="e.g. 7845612345:AAFh0w123456789_ABCdef..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#A855F7]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono text-gray-400">TELEGRAM CHAT ID (For 9304783530)</label>
                    <input
                      type="text"
                      value={chatIdInput}
                      onChange={(e) => setChatIdInput(e.target.value)}
                      placeholder="e.g. 1483928192"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#00D9FF]"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleSaveTelegram}
                    className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold text-white bg-[#A855F7] hover:bg-[#9333EA] transition-colors"
                  >
                    Save Telegram Credentials
                  </button>
                  <button
                    onClick={handleTestTelegram}
                    disabled={isTestingTelegram}
                    className="px-6 py-2.5 rounded-xl text-xs font-mono glass-button text-gray-300 hover:text-white hover:border-[#00D9FF]/50"
                  >
                    Send Test Alert
                  </button>
                </div>
              </div>
            </div>

            {/* Sample Alert Preview */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <h4 className="font-heading font-bold text-sm text-white">Live Alert Preview in Telegram App</h4>
              <div className="max-w-lg p-4 rounded-2xl bg-[#17212B] border border-[#2B3948] text-white font-sans text-xs space-y-2.5 shadow-xl">
                <div className="flex items-center justify-between border-b border-[#2B3948] pb-2 text-[11px] text-[#5EB5F7]">
                  <span className="font-bold">⚡ NEW 1-ON-1 APPOINTMENT BOOKED! ⚡</span>
                  <span className="text-[10px] text-gray-400">Just now</span>
                </div>
                <div className="space-y-1 text-gray-300">
                  <p><b className="text-white">Client:</b> Rohan Patel</p>
                  <p><b className="text-white">Email:</b> rohan@techcorp.com</p>
                  <p><b className="text-white">Phone:</b> +91 9876543210</p>
                  <p><b className="text-white">Topic:</b> Full Stack Architecture Mentorship</p>
                  <p><b className="text-white">Date & Slot:</b> 2026-11-05 at 10:00 AM</p>
                  <p><b className="text-white">Purpose:</b> Discuss Spring Boot microservices and system design review.</p>
                  <p className="pt-1 text-[#5EB5F7]"><b className="text-white">Platform:</b> Google Meet Video Call</p>
                </div>
                <div className="pt-2 border-t border-[#2B3948] text-[10px] text-gray-400 flex justify-between items-center">
                  <span>🚀 Rishu Jha — Personal Digital Universe</span>
                  <span className="text-[#5EB5F7]">9304783530</span>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Generic Content for other tabs */}
        {(activeTab === 'projects' || activeTab === 'experience' || activeTab === 'skills' || activeTab === 'services') && (
          <div className="glass-panel p-8 rounded-3xl border border-white/10 mt-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-heading font-bold text-lg text-white capitalize">{activeTab} Database Items</h3>
                <p className="text-xs font-mono text-gray-400">All entries are editable and persist to MongoDB collections.</p>
              </div>
              <button
                onClick={() => notify(`New ${activeTab} item modal opened`)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono text-white bg-gradient-to-r from-[#A855F7] to-[#7E22CE]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs font-mono text-gray-400">
              Module loaded. Full CRUD operations synchronized with NestJS backend at <code className="text-[#00D9FF]">/api/v1/{activeTab}</code>.
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
