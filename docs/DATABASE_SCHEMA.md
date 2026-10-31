# Database Schema Specification (MongoDB / Mongoose)

## Connection
- Development / Local URI: `mongodb://127.0.0.1:27017/rishu_universe`
- Production URI: `mongodb+srv://<user>:<password>@cluster.mongodb.net/rishu_universe`

## Collections & Indexes

### 1. `users`
| Field | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Auto-generated identifier |
| `email` | String | Unique, Required, Trim | Admin email (`shivayjha7@gmail.com`) |
| `passwordHash` | String | Required | Argon2/Bcrypt hash |
| `role` | String | Enum: `'admin'`, `'user'` | Role-based authorization |
| `refreshTokenHash` | String | Optional | Hashed refresh token for rotation |
| `lastLogin` | Date | Optional | Timestamp of last authenticated session |

### 2. `profiles`
Stores Rishu Kumar Jha's verified identity, bio, social channels, and resume link.

### 3. `projects`
Stores KartCom, Kevin AI, DocuChat, AlanPress, EventX, and Taxiwala with architecture notes, challenge breakdowns, tech stack tags, and repository/live URLs.

### 4. `experiences`
Vertical career entries: Cognizant (Programmer Analyst on TGS Geophysical app), CodeAlpha, and IIT Patna.

### 5. `educations`
Cochin University of Science and Technology (B.Tech CSE, 8.45 CGPA) and DAV Nandraj Public School, Ranchi.

### 6. `skills`
Categorized into Frontend, Backend, Databases, AI/ML, Cloud/DevOps, Other with proficiency percentages and icons.

### 7. `certifications`
OCI 2025 Certified Foundations Associate, Claude Certified Architect Foundations, Build with Gemini.

### 8. `services`
Marketplace items with title, pricing in INR, duration (60m), delivery method (Google Meet), and features list.

### 9. `bookings`
Real-time appointments.
- **Atomic Concurrency Protection Index**: Compound index `{ sessionDate: 1, startTime: 1, status: 1 }` preventing conflicting confirmed reservations.

### 10. `payments`
Razorpay order records with `razorpayOrderId`, `razorpayPaymentId`, `razorpaySignature`, `amount`, and `status`.

### 11. `contactMessages`
Incoming transmission inbox from the contact form.

### 12. `websiteSettings`
CMS settings for hero text, theme accents, SEO titles, and social URLs.

### 13. `analyticsEvents`
Privacy-conscious telemetry logging page views, project clicks, and booking conversions.
