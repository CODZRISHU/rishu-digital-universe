import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  Mail, 
  Phone, 
  FileText,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { RishuAvatar } from '../avatar/RishuAvatar';
import { portfolioApi } from '../services/api';

const SERVICES_CATALOG = [
  {
    id: 'mentorship-session',
    title: '1-on-1 Engineering & Career Mentorship',
    duration: '60 mins',
    desc: 'System design, Cognizant/MNC career navigation, resume auditing & guidance.'
  },
  {
    id: 'full-stack-dev',
    title: 'Full Stack Web Architecture Consulting',
    duration: '60 mins',
    desc: 'Architectural roadmap, React/Angular code review, distributed database modeling.'
  },
  {
    id: 'spring-microservices',
    title: 'Spring Boot & Microservices Engineering',
    duration: '60 mins',
    desc: 'Service discovery, Kafka, Elasticsearch and distributed transaction design.'
  },
  {
    id: 'ai-voice-apps',
    title: 'AI, LLM & Voice Applications Consultation',
    duration: '60 mins',
    desc: 'RAG pipelines, LangChain, voice interview systems, and API design.'
  }
];

const TIME_SLOTS = [
  '11:00 AM - 12:00 PM',
  '12:30 PM - 01:30 PM',
  '02:00 PM - 03:00 PM',
  '03:30 PM - 04:30 PM',
  '05:00 PM - 06:00 PM',
  '06:30 PM - 07:30 PM',
  '08:00 PM - 09:00 PM',
  '09:30 PM - 10:30 PM',
];

// Helper: Calculate next weekend date (Saturday or Sunday)
const getNextWeekend = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (d.getDay() !== 0 && d.getDay() !== 6) {
    d.setDate(d.getDate() + 1);
  }
  return d.toISOString().split('T')[0];
};

// Helper: Check if date is Saturday (6) or Sunday (0)
const isWeekend = (dateStr: string) => {
  if (!dateStr) return false;
  const [y, m, d] = dateStr.split('-').map(Number);
  const day = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return day === 0 || day === 6;
};

// Generate upcoming 4 weekend options for quick selection
const getUpcomingWeekends = () => {
  const options: { dateStr: string; label: string }[] = [];
  const cur = new Date();
  cur.setDate(cur.getDate() + 1);
  while (options.length < 4) {
    if (cur.getDay() === 0 || cur.getDay() === 6) {
      const dateStr = cur.toISOString().split('T')[0];
      const dayName = cur.toLocaleDateString('en-US', { weekday: 'short' });
      const monthDay = cur.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      options.push({
        dateStr,
        label: `${dayName}, ${monthDay}`,
      });
    }
    cur.setDate(cur.getDate() + 1);
  }
  return options;
};

export const BookSession: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState(
    SERVICES_CATALOG.find(s => s.id === serviceParam) || SERVICES_CATALOG[0]
  );
  
  // Weekend-only date setup (default to next Saturday or Sunday)
  const [sessionDate, setSessionDate] = useState<string>(getNextWeekend());
  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[0]);
  const upcomingWeekends = getUpcomingWeekends();
  const validWeekend = isWeekend(sessionDate);
  
  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  useEffect(() => {
    portfolioApi.trackEvent('booking_start', '/book-session');
  }, []);

  const handleCompleteBooking = async () => {
    if (!customerName || !customerEmail || !purpose) {
      setErrorMessage('Please fill in your name, email, and session purpose.');
      return;
    }
    setErrorMessage(null);
    setIsProcessing(true);

    try {
      // Direct Booking Saved to Database (No Payment Needed)
      const bookingData = await portfolioApi.createBooking({
        serviceId: selectedService.id,
        customerName,
        customerEmail,
        customerPhone,
        sessionDate,
        startTime: selectedSlot.split(' - ')[0],
        timezone: 'Asia/Kolkata',
        purpose,
        deliveryMethod: 'google_meet'
      });

      setIsProcessing(false);
      setBookingConfirmed(bookingData);
      setStep(4);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      portfolioApi.trackEvent('booking_complete', '/book-session', { service: selectedService.title });
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Unable to schedule booking slot. Please select another slot.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#A855F7] uppercase tracking-widest">
          <CalendarIcon className="w-4 h-4" />
          <span>Real-Time Appointment Scheduling</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight">
          Book a 1-on-1 Engineering Session
        </h1>
        <p className="text-gray-400 font-mono text-sm max-w-xl mx-auto">
          Reserve a confirmed slot for architecture reviews, microservices deep dives, AI project strategy, or career mentorship.
        </p>
      </div>

      {/* Progress Steps Header */}
      <div className="grid grid-cols-3 gap-2 mb-10 text-xs font-mono">
        <div className={`p-3 rounded-xl border text-center transition-colors ${
          step === 1 ? 'border-[#A855F7] bg-[#A855F7]/10 text-white font-semibold' : 'border-white/10 text-gray-400'
        }`}>
          1. Select Topic
        </div>
        <div className={`p-3 rounded-xl border text-center transition-colors ${
          step === 2 ? 'border-[#00D9FF] bg-[#00D9FF]/10 text-white font-semibold' : 'border-white/10 text-gray-400'
        }`}>
          2. Date & Time
        </div>
        <div className={`p-3 rounded-xl border text-center transition-colors ${
          step >= 3 ? 'border-[#C4B5FD] bg-[#C4B5FD]/10 text-white font-semibold' : 'border-white/10 text-gray-400'
        }`}>
          3. Details & Confirm
        </div>
      </div>

      {/* Step Content */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 relative">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Step 1: Select Service */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-heading font-bold text-white">Choose Your Session Focus:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICES_CATALOG.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => setSelectedService(srv)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    selectedService.id === srv.id
                      ? 'border-[#A855F7] bg-[#A855F7]/10 shadow-glow-primary'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#00D9FF]">{srv.duration}</span>
                      <span className="text-xs font-mono text-green-400 bg-green-500/10 px-2.5 py-0.5 rounded-full border border-green-500/20">
                        Free Session
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-white text-base">{srv.title}</h4>
                    <p className="text-xs text-gray-400">{srv.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-gray-400">
                    <Video className="w-3.5 h-3.5 text-[#A855F7]" />
                    <span>Google Meet Video Call</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-mono text-white bg-gradient-to-r from-[#A855F7] to-[#7E22CE] hover:scale-[1.02] transition-all shadow-glow-primary"
              >
                <span>Continue to Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Slot (Weekends 11am - 11pm only) */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-heading font-bold text-white">Select Date & Available Slot:</h3>
                <p className="text-xs font-mono text-[#00D9FF] mt-0.5">
                  ⚡ Live 1-on-1 sessions are hosted exclusively on <b>Weekends (Saturday & Sunday)</b> from <b>11:00 AM to 11:00 PM IST</b>.
                </p>
              </div>
              <button onClick={() => setStep(1)} className="text-xs font-mono text-gray-400 hover:text-white shrink-0">
                ← Change Topic
              </button>
            </div>

            {/* Quick Weekend Select Buttons */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                Quick Select Upcoming Weekend:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {upcomingWeekends.map((opt) => (
                  <button
                    key={opt.dateStr}
                    type="button"
                    onClick={() => setSessionDate(opt.dateStr)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono border transition-all ${
                      sessionDate === opt.dateStr
                        ? 'bg-[#A855F7]/20 border-[#A855F7] text-white shadow-glow-primary font-bold'
                        : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    📅 {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-300 block">Or Choose Custom Weekend Date:</label>
                <input
                  type="date"
                  value={sessionDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white font-mono text-sm focus:outline-none ${
                    validWeekend ? 'border-white/10 focus:border-[#A855F7]' : 'border-amber-500/80 bg-amber-500/10'
                  }`}
                />
                {!validWeekend ? (
                  <p className="text-xs text-amber-400 font-mono flex items-center gap-1.5 mt-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Selected date is a weekday. Please pick a Saturday or Sunday.</span>
                  </p>
                ) : (
                  <p className="text-[11px] text-green-400 font-mono flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Valid weekend date selected (11:00 AM – 11:00 PM IST).</span>
                  </p>
                )}
              </div>

              {/* Slots */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-gray-300">Available Weekend Slots:</label>
                  <span className="text-[10px] font-mono text-gray-400">11 AM – 11 PM</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      disabled={!validWeekend}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-mono border transition-all ${
                        selectedSlot === slot
                          ? 'border-[#00D9FF] bg-[#00D9FF]/15 text-white font-semibold shadow-glow-secondary'
                          : 'border-white/10 bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/20'
                      } ${!validWeekend ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-white/10">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl text-xs font-mono glass-button text-gray-300"
              >
                Back
              </button>
              <button
                onClick={() => validWeekend && setStep(3)}
                disabled={!validWeekend}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-mono text-white transition-all ${
                  validWeekend
                    ? 'bg-gradient-to-r from-[#00D9FF] to-[#0099BF] hover:scale-[1.02] shadow-glow-secondary'
                    : 'bg-gray-700/50 cursor-not-allowed opacity-50'
                }`}
              >
                <span>Continue to Attendee Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Attendee Details & Instant Confirmation */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-heading font-bold text-white">Your Information:</h3>
              <button onClick={() => setStep(2)} className="text-xs font-mono text-gray-400 hover:text-white">
                ← Change Slot
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#A855F7]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#A855F7]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Phone / WhatsApp (Optional)</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#A855F7]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Session Objective / Topics *</label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Spring Boot microservices review & resume guidance"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#A855F7]"
                  />
                </div>
              </div>
            </div>

            {/* Session Summary Card */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Session:</span>
                <span className="text-white font-semibold">{selectedService.title}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Date & Slot:</span>
                <span className="text-[#00D9FF]">{sessionDate} at {selectedSlot}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-gray-400 pt-2 border-t border-white/5">
                <span>Booking Type:</span>
                <span className="text-green-400 font-mono font-medium">Free 1-on-1 Session</span>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-white/10">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl text-xs font-mono glass-button text-gray-300"
              >
                Back
              </button>
              <button
                disabled={isProcessing}
                onClick={handleCompleteBooking}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-mono text-white bg-gradient-to-r from-[#A855F7] to-[#7E22CE] hover:from-[#9333EA] hover:to-[#6B21A8] transition-all shadow-glow-primary hover:scale-[1.02] disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isProcessing ? 'Reserving Slot...' : 'Schedule Confirmed Session'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmed & Celebration */}
        {step === 4 && (
          <div className="text-center py-6 space-y-6">
            <div className="flex justify-center">
              <RishuAvatar size="lg" mode="bust" expression="happy" animation="celebrate" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>APPOINTMENT OFFICIALLY SCHEDULED</span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-white">
                You&apos;re Confirmed, {customerName}!
              </h2>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                Your 1-on-1 session is scheduled with Rishu for{' '}
                <span className="text-[#00D9FF] font-mono">{sessionDate} at {selectedSlot}</span>.
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-2xl glass-panel text-left space-y-2 text-xs font-mono text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-500">Topic:</span>
                <span className="text-white">{selectedService.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Platform:</span>
                <span className="text-[#00D9FF]">Google Meet Video</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span className="text-white">{customerEmail}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2.5 rounded-xl text-xs font-mono glass-button text-gray-300 hover:text-white"
              >
                Schedule Another Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
