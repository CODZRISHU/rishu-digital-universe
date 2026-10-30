// ============================================================================
// RISHU JHA — PERSONAL DIGITAL UNIVERSE
// Shared Types & Domain Contracts
// ============================================================================

export type UserRole = 'admin' | 'user';

export interface IUser {
  _id: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface ILoginDto {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: {
    _id: string;
    email: string;
    role: UserRole;
  };
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  sub: string;
  email: string;
  role: UserRole;
}

// ----------------------------------------------------------------------------
// Profile
// ----------------------------------------------------------------------------
export interface ISocialLinks {
  github: string;
  linkedin: string;
  email: string;
  twitter?: string;
  website?: string;
}

export interface IProfile {
  _id: string;
  name: string;
  headline: string;
  tagline: string;
  bio: string;
  location: string;
  avatarUrl: string;
  photoUrl: string;
  socialLinks: ISocialLinks;
  resumeUrl: string;
  yearsOfExperience: string;
  updatedAt: string;
}

// ----------------------------------------------------------------------------
// Projects
// ----------------------------------------------------------------------------
export type ProjectCategory = 'full-stack' | 'ai-nlp' | 'voice-ai' | 'cloud' | 'mobile' | 'system';

export interface IProject {
  _id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  description: string;
  longDescription: string;
  techStack: string[];
  coverImage: string;
  screenshots: string[];
  githubUrl?: string;
  liveUrl?: string;
  architectureNotes?: string;
  challenges?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt?: string;
}

// ----------------------------------------------------------------------------
// Experience
// ----------------------------------------------------------------------------
export interface IExperience {
  _id: string;
  company: string;
  role: string;
  departmentOrClient?: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  responsibilities: string[];
  technologies: string[];
  order: number;
  createdAt?: string;
}

// ----------------------------------------------------------------------------
// Education
// ----------------------------------------------------------------------------
export interface IEducation {
  _id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
  activities?: string[];
  order: number;
}

// ----------------------------------------------------------------------------
// Skills
// ----------------------------------------------------------------------------
export type SkillCategory = 'frontend' | 'backend' | 'database' | 'aiml' | 'cloud' | 'other';

export interface ISkill {
  _id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 0 - 100
  icon?: string;
  featured: boolean;
  order: number;
}

// ----------------------------------------------------------------------------
// Certifications
// ----------------------------------------------------------------------------
export interface ICertification {
  _id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  verificationLink?: string;
  badgeImage?: string;
  order: number;
}

// ----------------------------------------------------------------------------
// Services
// ----------------------------------------------------------------------------
export type ServiceCategory = 'development' | 'ai-solutions' | 'mentorship' | 'career';
export type DeliveryMethod = 'google_meet' | 'remote' | 'async';

export interface IService {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number; // in INR
  durationMinutes: number;
  category: ServiceCategory;
  deliveryMethod: DeliveryMethod;
  isActive: boolean;
  features: string[];
  icon?: string;
  order: number;
}

// ----------------------------------------------------------------------------
// Bookings
// ----------------------------------------------------------------------------
export type BookingStatus = 'pending' | 'confirmed' | 'rescheduled' | 'cancelled' | 'refunded' | 'completed';

export interface IBooking {
  _id: string;
  serviceId: string | IService;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  sessionDate: string; // YYYY-MM-DD
  startTime: string;   // HH:mm
  endTime: string;     // HH:mm
  timezone: string;
  purpose: string;
  deliveryMethod: DeliveryMethod;
  amount: number;
  paymentId?: string;
  status: BookingStatus;
  meetingLink?: string;
  calendarEventId?: string;
  notes?: string;
  createdAt: string;
}

export interface ICreateBookingDto {
  serviceId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  sessionDate: string;
  startTime: string;
  timezone?: string;
  purpose: string;
  deliveryMethod?: DeliveryMethod;
}

// ----------------------------------------------------------------------------
// Availability
// ----------------------------------------------------------------------------
export interface ISlot {
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
}

export interface IAvailability {
  _id: string;
  dayOfWeek: number; // 0 (Sunday) - 6 (Saturday)
  slots: ISlot[];
  isAvailable: boolean;
}

// ----------------------------------------------------------------------------
// Payments
// ----------------------------------------------------------------------------
export type PaymentStatus = 'created' | 'authorized' | 'captured' | 'failed' | 'refunded';

export interface IPayment {
  _id: string;
  bookingId: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  createdAt: string;
}

export interface ICreateRazorpayOrderDto {
  bookingId: string;
  amount: number;
  currency?: string;
}

export interface IVerifyPaymentDto {
  bookingId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

// ----------------------------------------------------------------------------
// Contact Inquiries
// ----------------------------------------------------------------------------
export type ContactStatus = 'new' | 'read' | 'archived';

export interface IContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
}

export interface ICreateContactDto {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ----------------------------------------------------------------------------
// Website Settings
// ----------------------------------------------------------------------------
export interface IWebsiteSettings {
  _id: string;
  heroHeadline: string;
  heroTagline: string;
  heroSubtext: string;
  accentColor: string;
  secondaryAccent: string;
  enableBookings: boolean;
  enableTestimonials: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  githubUrl: string;
  linkedinUrl: string;
  email: string;
}

// ----------------------------------------------------------------------------
// Analytics
// ----------------------------------------------------------------------------
export type EventType =
  | 'page_view'
  | 'project_click'
  | 'resume_download'
  | 'service_view'
  | 'booking_start'
  | 'booking_complete'
  | 'contact_submit';

export interface IAnalyticsEvent {
  _id: string;
  eventType: EventType;
  pagePath: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface IDashboardMetrics {
  totalVisitors: number;
  portfolioViews: number;
  totalProjects: number;
  totalBookings: number;
  upcomingSessions: number;
  pendingBookings: number;
  totalRevenue: number;
  recentMessages: number;
  popularProjects: Array<{ title: string; views: number }>;
}

// ----------------------------------------------------------------------------
// API Standard Response Envelope
// ----------------------------------------------------------------------------
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}
