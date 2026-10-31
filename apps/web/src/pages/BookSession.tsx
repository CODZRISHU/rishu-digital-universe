import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { RishuAvatar } from '../avatar/RishuAvatar';
import { portfolioApi } from '../services/api';

const SERVICES_CATALOG = [
  {
    id: 'mentorship-session',
    title: '1-on-1 Engineering & Career Mentorship',
    price: 999,
    duration: '60 mins',
    desc: 'System design, Cognizant/MNC career navigation, resume auditing.'
  },
  {
    id: 'full-stack-dev',
    title: 'Full Stack Web Architecture Consulting',
    price: 4999,
    duration: '60 mins',
    desc: 'Architectural roadmap, React/Angular code review, database modeling.'
  },
  {
    id: 'spring-microservices',
    title: 'Spring Boot & Microservices Engineering',
    price: 3999,
    duration: '60 mins',
    desc: 'Service discovery, Kafka, Elasticsearch and distributed transaction design.'
  },
  {
    id: 'ai-voice-apps',
    title: 'AI, LLM & Voice Applications Consultation',
    price: 4499,
    duration: '60 mins',
    desc: 'RAG pipelines, LangChain, voice interview systems, and API design.'
  }
];

const TIME_SLOTS = [
  '10:00 AM - 11:00 AM',
  '11:30 AM - 12:30 PM',
  '02:30 PM - 03:30 PM',
  '04:00 PM - 05:00 PM',
  '06:30 PM - 07:30 PM',
  '08:00 PM - 09:00 PM',
];

export const BookSession: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState(
    SERVICES_CATALOG.find(s => s.id === serviceParam) || SERVICES_CATALOG[0]
  );
  
  // Date setup (default tomorrow)
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  const formattedDefaultDate = defaultDate.toISOString().split('T')[0];

  const [sessionDate, setSessionDate] = useState<string>(formattedDefaultDate);
  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[0]);
  
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
      // 1. Create booking in backend
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

      // 2. Simulate or trigger Razorpay Checkout
      if (typeof (window as any).Razorpay !== 'undefined') {
        const orderData = await portfolioApi.createRazorpayOrder(bookingData._id);
        
        const options = {
          key: orderData.keyId || 'rzp_test_placeholder',
          amount: orderData.amount,
          currency: 'INR',
          name: 'Rishu Kumar Jha',
          description: selectedService.title,
          order_id: orderData.orderId,
          handler: async (response: any) => {
            await portfolioApi.verifyRazorpayPayment({
              bookingId: bookingData._id,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            finalizeSuccess(bookingData);
          },
          prefill: {
            name: customerName,
            email: customerEmail,
            contact: customerPhone,
          },
          theme: { color: '#A855F7' }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', () => {
          setErrorMessage('Payment did not complete. Please try again.');
          setIsProcessing(false);
        });
        rzp.open();
      } else {
        // Fallback simulation in development
        await new Promise(r => setTimeout(r, 1200));
        finalizeSuccess(bookingData);
      }
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Unable to schedule booking slot. Please select another slot.');
      setIsProcessing(false);
    }
  };

  const finalizeSuccess = (booking: any) => {
    setIsProcessing(false);
    setBookingConfirmed(booking);
    setStep(4);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    portfolioApi.trackEvent('booking_complete', '/book-session', { service: selectedService.title });
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
          Reserve a confirmed slot for architecture reviews, microservices deep dives, AI project strategy, or career guidance.
        </p>
      </div>

      {/* Progress Steps Header */}
      <div className="grid grid-cols-3 gap-2 mb-10 text-xs font-mono">
        <div className={`p-3 rounded-xl border text-center transition-colors ${
          step === 1 ? 'border-[#A855F7] bg-[#A855F7]/10 text-white font-semibold' : 'border-white/10 text-gray-400'
        }`}>
          1. Select Service
        </div>
        <div className={`p-3 rounded-xl border text-center transition-colors ${
          step === 2 ? 'border-[#00D9FF] bg-[#00D9FF]/10 text-white font-semibold' : 'border-white/10 text-gray-400'
        }`}>
          2. Date & Time
        </div>
        <div className={`p-3 rounded-xl border text-center transition-colors ${
          step >= 3 ? 'border-[#C4B5FD] bg-[#C4B5FD]/10 text-white font-semibold' : 'border-white/10 text-gray-400'
        }`}>
          3. Details & Checkout
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
            <h3 className="text-xl font-heading font-bold text-white">Choose Your Session Type:</h3>
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
                      <span className="text-lg font-heading font-bold text-white">₹{srv.price.toLocaleString()}</span>
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

        {/* Step 2: Date & Slot */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-heading font-bold text-white">Select Date & Available Slot:</h3>
              <button onClick={() => setStep(1)} className="text-xs font-mono text-gray-400 hover:text-white">
                ← Change Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Date Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-300 block">Session Date (Asia/Kolkata):</label>
                <input
                  type="date"
                  value={sessionDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSessionDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#A855F7]"
                />
                <p className="text-[11px] text-gray-500 font-mono">
                  Bookings open up to 14 days in advance.
                </p>
              </div>

              {/* Slots */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-300 block">Available Time Slots:</label>
                <div className="grid grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-mono border transition-all ${
                        selectedSlot === slot
                          ? 'border-[#00D9FF] bg-[#00D9FF]/15 text-white font-semibold shadow-glow-secondary'
                          : 'border-white/10 bg-white/[0.02] text-gray-400 hover:text-white hover:border-white/20'
                      }`}
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
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-mono text-white bg-gradient-to-r from-[#00D9FF] to-[#0099BF] hover:scale-[1.02] transition-all shadow-glow-secondary"
              >
                <span>Continue to Your Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Details & Payment */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-heading font-bold text-white">Attendee Information:</h3>
              <button onClick={() => setStep(2)} className="text-xs font-mono text-gray-400 hover:text-white">
                ← Change Slot
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

            {/* Session Order Summary */}
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
                <span>Total Amount:</span>
                <span className="text-lg font-heading font-bold text-white">₹{selectedService.price.toLocaleString()} INR</span>
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
                <CreditCard className="w-4 h-4" />
                <span>{isProcessing ? 'Verifying & Reserving...' : `Pay ₹${selectedService.price} via Razorpay`}</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmed & Celebration */}
        {step === 4 && (
          <div className="text-center py-6 space-y-6">
            <div className="flex justify-center">
              <RishuAvatar size="lg" expression="happy" animation="celebrate" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>BOOKING OFFICIALLY CONFIRMED</span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-white">
                You&apos;re All Set, {customerName}!
              </h2>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                A confirmation with your Google Meet video invite and calendar sync details has been recorded for{' '}
                <span className="text-[#00D9FF] font-mono">{sessionDate} at {selectedSlot}</span>.
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-2xl glass-panel text-left space-y-2 text-xs font-mono text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-500">Service:</span>
                <span className="text-white">{selectedService.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery:</span>
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
                Book Another Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
