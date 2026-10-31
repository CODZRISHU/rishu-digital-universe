# REST API Documentation

Base URL: `/api/v1`
Interactive Swagger OpenAPI Docs: `http://localhost:5000/api/docs`

## Endpoints Summary

### Authentication (`/auth`)
- `POST /auth/login`: Authenticate admin with email & password. Returns JWT access & refresh tokens.
- `POST /auth/refresh`: Rotate refresh token and issue new 15-minute access token.
- `POST /auth/logout`: Revoke active session (requires Bearer token).
- `GET /auth/me`: Get current authenticated user details.

### Public Portfolio (`/profile`, `/projects`, `/experience`, `/skills`, `/education`, `/certifications`)
- `GET /profile`: Get verified profile.
- `GET /projects`: Get all published software projects.
- `GET /projects/:slug`: Get detailed architecture specs of a single project.
- `GET /experience`: Get vertical career timeline.
- `GET /skills`: Get categorized skills and proficiencies.
- `GET /education`: Get university degrees and schooling.
- `GET /certifications`: Get verified credentials.

### Services & Bookings (`/services`, `/bookings`)
- `GET /services`: Get all active consulting and development offerings.
- `GET /bookings/slots?date=YYYY-MM-DD`: Get available unreserved time slots for date.
- `POST /bookings`: Schedule pending appointment with slot reservation.
- `GET /bookings/admin/all`: [Admin] View all bookings and client info.
- `PATCH /bookings/admin/:id/status`: [Admin] Approve, reschedule, or cancel appointments.

### Payments (`/payments`)
- `POST /payments/razorpay/create-order`: Generate Razorpay order for booking.
- `POST /payments/razorpay/verify`: Cryptographically verify HMAC-SHA256 signature and confirm booking.

### Inquiries & Analytics (`/contact`, `/analytics`, `/settings`)
- `POST /contact`: Submit contact inquiry.
- `GET /contact/admin/all`: [Admin] Retrieve inquiry transmissions.
- `POST /analytics/event`: Privacy-conscious telemetry event.
- `GET /analytics/metrics`: [Admin] Dashboard KPIs (revenue, impressions, sessions).
- `GET /settings`: Get global design & SEO parameters.
- `PUT /settings`: [Admin] Update theme accent, headline, and SEO settings.
