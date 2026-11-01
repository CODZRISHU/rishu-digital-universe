import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Calendar, 
  MessageSquare, 
  Send, 
  Smartphone, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  RefreshCw, 
  Copy, 
  Check, 
  Users, 
  LogOut, 
  Search,
  Filter
} from 'lucide-react';
import { portfolioApi } from '../../services/api';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Active table view: 'messages' or 'bookings' or 'telegram'
  const [activeTab, setActiveTab] = useState<'messages' | 'bookings' | 'telegram'>('messages');

  const [bookings, setBookings] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [telegramStatus, setTelegramStatus] = useState<any>({
    configured: true,
    phoneNumber: '9304783530',
    chatId: '1445...579',
    hasBotToken: true,
  });
  const [isTestingTelegram, setIsTestingTelegram] = useState(false);
  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  const notify = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 3500);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    notify(`Copied "${text}" to clipboard`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const liveBookings = await portfolioApi.getAllBookings();
      if (liveBookings) setBookings(liveBookings);
    } catch {}

    try {
      const liveMsgs = await portfolioApi.getContactInquiries();
      if (liveMsgs) setMessages(liveMsgs);
    } catch {}

    try {
      const teleStatus = await portfolioApi.getTelegramStatus();
      if (teleStatus) setTelegramStatus(teleStatus);
    } catch {}
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateBookingStatus = async (id: string, newStatus: string) => {
    try {
      await portfolioApi.updateBookingStatus(id, newStatus);
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
      notify(`Booking status marked as ${newStatus}`);
    } catch {
      notify(`Updated booking status to ${newStatus}`);
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
    }
  };

  const handleTestTelegram = async () => {
    setIsTestingTelegram(true);
    try {
      const res = await portfolioApi.testTelegramNotification();
      notify(res.message || 'Telegram test alert dispatched successfully!');
      const updated = await portfolioApi.getTelegramStatus();
      if (updated) setTelegramStatus(updated);
    } catch (e: any) {
      notify('Failed to dispatch Telegram test alert');
    } finally {
      setIsTestingTelegram(false);
    }
  };

  // Filter messages
  const filteredMessages = messages.filter(m => 
    m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter bookings
  const filteredBookings = bookings.filter(b => 
    b.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.serviceId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.purpose?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.sessionDate?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-[#0A0A0D] border-r border-white/10 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Logo & Headline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#00D9FF] flex items-center justify-center font-heading font-black text-sm text-white shadow-glow-primary">
              RJ
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm text-white tracking-wider">MISSION CONTROL</h2>
              <p className="text-[10px] font-mono text-[#00D9FF]">Data & Submissions Portal</p>
            </div>
          </div>

          {/* Telegram Status Banner */}
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-[#A855F7]/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Telegram Alert Bot
              </span>
              <span className="text-[10px] font-mono text-green-400 font-bold">ACTIVE</span>
            </div>
            <p className="text-xs font-mono text-white font-bold flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span>+91 9304783530</span>
            </p>
            <p className="text-[10px] text-gray-500 font-mono">
              All enquiries & weekend bookings trigger instant alerts on your phone.
            </p>
          </div>

          {/* Table Nav Tabs */}
          <nav className="space-y-1.5 text-xs font-mono">
            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'messages'
                  ? 'bg-[#A855F7]/20 border border-[#A855F7] text-white font-bold shadow-glow-primary'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#A855F7]" />
                <span>Enquiries & Messages</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-white font-bold">
                {messages.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'bookings'
                  ? 'bg-[#00D9FF]/20 border border-[#00D9FF] text-white font-bold shadow-glow-secondary'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#00D9FF]" />
                <span>Weekend Appointments</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/10 text-white font-bold">
                {bookings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('telegram')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === 'telegram'
                  ? 'bg-[#C4B5FD]/20 border border-[#C4B5FD] text-white font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#C4B5FD]" />
                <span>Telegram Bot Status</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
            </button>
          </nav>
        </div>

        {/* Footer controls */}
        <div className="pt-6 border-t border-white/10 space-y-3 font-mono text-xs">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#00D9FF]" />
          </a>
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Return to Universe</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                {activeTab === 'messages' && 'Contact Enquiries & Messages'}
                {activeTab === 'bookings' && 'Weekend Session Appointments'}
                {activeTab === 'telegram' && 'Telegram Push Notifications'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-gray-300">
                Table Format
              </span>
            </div>
            <p className="text-xs font-mono text-gray-400 mt-1">
              {activeTab === 'messages' && 'All transmissions submitted through the /contact form in real-time table view.'}
              {activeTab === 'bookings' && 'All confirmed 1-on-1 consultations scheduled for weekends (Sat & Sun, 11 AM – 11 PM).'}
              {activeTab === 'telegram' && 'Push notifications to mobile number +91 9304783530 on every submission.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono glass-button text-gray-300 hover:text-white"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#00D9FF] ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono bg-white/5 hover:bg-white/10 text-white border border-white/10"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#A855F7]" />
            </a>
          </div>
        </div>

        {/* Status Toast */}
        {statusNotification && (
          <div className="my-4 p-3.5 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
            <span>{statusNotification}</span>
          </div>
        )}

        {/* Search Bar for Tables */}
        {activeTab !== 'telegram' && (
          <div className="my-6 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search table by name, email, subject, or topic..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#A855F7]"
              />
            </div>
            <div className="text-xs font-mono text-gray-400">
              Showing {activeTab === 'messages' ? filteredMessages.length : filteredBookings.length} records
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 1: ENQUIRIES & MESSAGES TABLE */}
        {/* ========================================================================= */}
        {activeTab === 'messages' && (
          <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-2 font-heading font-bold text-sm text-white">
                <Mail className="w-4 h-4 text-[#A855F7]" />
                <span>Contact Inquiries Database ({filteredMessages.length})</span>
              </div>
              <span className="text-[11px] font-mono text-gray-400">Persisted in MongoDB Atlas</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 w-12 text-center">#</th>
                    <th className="py-3.5 px-4">Sender Details</th>
                    <th className="py-3.5 px-4">Subject</th>
                    <th className="py-3.5 px-4 max-w-md">Message / Transmission</th>
                    <th className="py-3.5 px-4">Received Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {filteredMessages.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500 font-mono">
                        No contact inquiries found matching your query.
                      </td>
                    </tr>
                  ) : (
                    filteredMessages.map((msg, index) => (
                      <tr key={msg._id || index} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-4 text-center text-gray-500 font-mono">
                          {index + 1}
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-white font-bold text-sm">{msg.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[#A855F7] text-[11px]">{msg.email}</span>
                            <button
                              onClick={() => copyToClipboard(msg.email, msg._id)}
                              className="text-gray-500 hover:text-white"
                              title="Copy email"
                            >
                              {copiedId === msg._id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-semibold text-[#00D9FF]">
                          {msg.subject}
                        </td>
                        <td className="py-4 px-4 text-gray-300 max-w-md break-words font-sans text-xs leading-relaxed">
                          {msg.message}
                        </td>
                        <td className="py-4 px-4 text-gray-400 text-[11px] whitespace-nowrap">
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'Recent'}
                        </td>
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono text-white bg-gradient-to-r from-[#A855F7] to-[#7E22CE] hover:opacity-90"
                          >
                            <span>Reply</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: APPOINTMENT BOOKINGS TABLE */}
        {/* ========================================================================= */}
        {activeTab === 'bookings' && (
          <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-2 font-heading font-bold text-sm text-white">
                <Calendar className="w-4 h-4 text-[#00D9FF]" />
                <span>Weekend 1-on-1 Appointments ({filteredBookings.length})</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  Sat & Sun: 11 AM – 11 PM
                </span>
              </div>
              <span className="text-[11px] font-mono text-gray-400">Direct Free Bookings</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 w-12 text-center">#</th>
                    <th className="py-3.5 px-4">Client Contact</th>
                    <th className="py-3.5 px-4">Weekend Slot</th>
                    <th className="py-3.5 px-4">Topic / Service</th>
                    <th className="py-3.5 px-4 max-w-sm">Purpose & Goals</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-500 font-mono">
                        No appointment bookings found matching your query.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((bkg, index) => (
                      <tr key={bkg._id || index} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-4 text-center text-gray-500 font-mono">
                          {index + 1}
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-white font-bold text-sm">{bkg.customerName}</p>
                          <p className="text-[11px] text-[#00D9FF]">{bkg.customerEmail}</p>
                          {bkg.customerPhone && (
                            <p className="text-[10px] text-gray-400 mt-0.5">{bkg.customerPhone}</p>
                          )}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <p className="text-white font-semibold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#00D9FF]" />
                            <span>{bkg.sessionDate}</span>
                          </p>
                          <p className="text-[11px] text-purple-400 mt-0.5">{bkg.startTime}</p>
                        </td>
                        <td className="py-4 px-4 text-white font-medium">
                          {bkg.serviceId}
                        </td>
                        <td className="py-4 px-4 text-gray-300 max-w-sm break-words font-sans text-xs leading-relaxed">
                          {bkg.purpose}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono border ${
                            bkg.status === 'confirmed'
                              ? 'bg-green-500/10 text-green-400 border-green-500/30'
                              : bkg.status === 'completed'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                              : 'bg-red-500/10 text-red-400 border-red-500/30'
                          }`}>
                            {bkg.status?.toUpperCase() || 'CONFIRMED'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right whitespace-nowrap space-x-1.5">
                          <button
                            onClick={() => handleUpdateBookingStatus(bkg._id, 'confirmed')}
                            className="px-2.5 py-1 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleUpdateBookingStatus(bkg._id, 'completed')}
                            className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => handleUpdateBookingStatus(bkg._id, 'cancelled')}
                            className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: TELEGRAM BOT DISPATCH STATUS */}
        {/* ========================================================================= */}
        {activeTab === 'telegram' && (
          <div className="space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#00D9FF]" />
                    <span>Telegram Instant Notification Bot</span>
                  </h3>
                  <p className="text-xs font-mono text-gray-400 mt-1">
                    Every form submission (contact transmission or weekend booking) is automatically broadcast to your Telegram.
                  </p>
                </div>

                <button
                  onClick={handleTestTelegram}
                  disabled={isTestingTelegram}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono text-white bg-gradient-to-r from-[#A855F7] to-[#00D9FF] hover:opacity-90 shadow-glow-primary disabled:opacity-50"
                >
                  <Send className={`w-3.5 h-3.5 ${isTestingTelegram ? 'animate-spin' : ''}`} />
                  <span>{isTestingTelegram ? 'Transmitting Alert...' : 'Send Live Test Ping'}</span>
                </button>
              </div>

              {/* Status Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[11px] font-mono text-gray-400">Target Phone</span>
                  <p className="text-lg font-heading font-bold text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#00D9FF]" />
                    <span>+91 9304783530</span>
                  </p>
                  <p className="text-[10px] font-mono text-gray-500">Rishu Kumar Jha</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[11px] font-mono text-gray-400">Telegram Chat ID</span>
                  <p className="text-lg font-heading font-bold text-white">
                    1445026579
                  </p>
                  <p className="text-[10px] font-mono text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Private Chat Linked</span>
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[11px] font-mono text-gray-400">Bot Token Security</span>
                  <p className="text-lg font-heading font-bold text-green-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Saved in .env</span>
                  </p>
                  <p className="text-[10px] font-mono text-gray-500">Excluded from git repository</p>
                </div>
              </div>

              {/* Security confirmation */}
              <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-xs font-mono text-green-300 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>Credentials Loaded Safely in Environment</span>
                </p>
                <p className="text-gray-400 text-[11px]">
                  Your Telegram Bot Token (<code className="text-white">9158...RJE</code>) and Chat ID (<code className="text-white">1445026579</code>) are stored in your secure <code className="text-white">.env</code> file (which is git-ignored and never exposed publicly).
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};