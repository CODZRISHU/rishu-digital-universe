import axios from 'axios';
import type { 
  IProfile, 
  IProject, 
  IExperience, 
  IEducation, 
  ISkill, 
  ICertification, 
  IService, 
  IBooking, 
  ICreateBookingDto,
  ICreateContactDto,
  IWebsiteSettings,
  IDashboardMetrics,
  IAuthResponse,
  ILoginDto,
  ApiResponse
} from '@rishu/shared-types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor to inject token if stored
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('rishu_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle token refresh if 401
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('rishu_refresh_token');
      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
          const { accessToken } = res.data.data;
          localStorage.setItem('rishu_access_token', accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (e) {
          localStorage.removeItem('rishu_access_token');
          localStorage.removeItem('rishu_refresh_token');
        }
      }
    }
    return Promise.reject(error);
  }
);

export const portfolioApi = {
  // Public Data
  getProfile: async () => (await apiClient.get<ApiResponse<IProfile>>('/profile')).data.data!,
  getProjects: async () => (await apiClient.get<ApiResponse<IProject[]>>('/projects')).data.data!,
  getProjectBySlug: async (slug: string) => (await apiClient.get<ApiResponse<IProject>>(`/projects/${slug}`)).data.data!,
  getExperiences: async () => (await apiClient.get<ApiResponse<IExperience[]>>('/experience')).data.data!,
  getEducations: async () => (await apiClient.get<ApiResponse<IEducation[]>>('/education')).data.data!,
  getSkills: async () => (await apiClient.get<ApiResponse<ISkill[]>>('/skills')).data.data!,
  getCertifications: async () => (await apiClient.get<ApiResponse<ICertification[]>>('/certifications')).data.data!,
  getServices: async () => (await apiClient.get<ApiResponse<IService[]>>('/services')).data.data!,
  getWebsiteSettings: async () => (await apiClient.get<ApiResponse<IWebsiteSettings>>('/settings')).data.data!,

  // Bookings & Payments
  getAvailableSlots: async (date: string) => 
    (await apiClient.get<ApiResponse<{ startTime: string; endTime: string }[]>>(`/bookings/slots?date=${date}`)).data.data!,
  createBooking: async (dto: ICreateBookingDto) => 
    (await apiClient.post<ApiResponse<IBooking>>('/bookings', dto)).data.data!,
  createRazorpayOrder: async (bookingId: string) => 
    (await apiClient.post<ApiResponse<any>>('/payments/razorpay/create-order', { bookingId })).data.data!,
  verifyRazorpayPayment: async (data: any) => 
    (await apiClient.post<ApiResponse<any>>('/payments/razorpay/verify', data)).data.data!,

  // Contact Inquiry
  sendContactMessage: async (dto: ICreateContactDto) => 
    (await apiClient.post<ApiResponse<any>>('/contact', dto)).data,

  // Analytics
  trackEvent: async (eventType: string, pagePath: string, metadata?: any) => {
    try {
      await apiClient.post('/analytics/event', { eventType, pagePath, metadata });
    } catch {
      // Non-blocking telemetry
    }
  },

  // Admin Dashboard Management
  login: async (dto: ILoginDto) => 
    (await apiClient.post<ApiResponse<IAuthResponse>>('/auth/login', dto)).data.data!,
  getMetrics: async () => 
    (await apiClient.get<ApiResponse<IDashboardMetrics>>('/analytics/metrics')).data.data!,
  getAllBookings: async () => 
    (await apiClient.get<ApiResponse<IBooking[]>>('/bookings/admin/all')).data.data!,
  updateBookingStatus: async (id: string, status: string) => 
    (await apiClient.patch<ApiResponse<IBooking>>(`/bookings/admin/${id}/status`, { status })).data.data!,
  getContactInquiries: async () => 
    (await apiClient.get<ApiResponse<any[]>>('/contact/admin/all')).data.data!,
  
  // Telegram Notifications
  getTelegramStatus: async () => 
    (await apiClient.get<ApiResponse<any>>('/telegram/status')).data.data!,
  updateTelegramConfig: async (data: { botToken: string; chatId: string }) => 
    (await apiClient.post<ApiResponse<any>>('/telegram/config', data)).data.data!,
  testTelegramNotification: async () => 
    (await apiClient.post<ApiResponse<any>>('/telegram/test')).data,

  // Generic CRUD mutations
  createItem: async <T>(module: string, data: any) => 
    (await apiClient.post<ApiResponse<T>>(`/${module}`, data)).data.data!,
  updateItem: async <T>(module: string, id: string, data: any) => 
    (await apiClient.put<ApiResponse<T>>(`/${module}/${id}`, data)).data.data!,
  deleteItem: async (module: string, id: string) => 
    (await apiClient.delete<ApiResponse<any>>(`/${module}/${id}`)).data,
};

