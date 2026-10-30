# Architecture Overview

```
rishu-digital-universe/
├── apps/
│   ├── web/                     # React + Vite frontend
│   │   ├── src/
│   │   │   ├── avatar/          # AI SVG Avatar components & animation engine
│   │   │   ├── three/           # Three.js 3D starry scene & floating objects
│   │   │   ├── components/      # UI components (public & admin)
│   │   │   ├── pages/           # Public pages & admin CMS modules
│   │   │   ├── hooks/           # Custom React hooks (auth, cursor, analytics)
│   │   │   └── services/        # API client layer (Axios + TanStack Query)
│   └── api/                     # NestJS backend
│       ├── src/
│       │   ├── modules/         # Auth, Profile, Projects, Bookings, Payments, etc.
│       │   ├── database/        # Mongoose schemas & Seed script
│       │   └── common/          # Guards, Filters, Decorators
├── packages/
│   └── shared-types/            # Canonical contracts shared across web & api
├── infrastructure/              # Docker & Nginx orchestration
└── docs/                        # Specifications and guides
```

## Data Flow
1. **Public Browsing**: React frontend requests published profile/project data via cached REST queries (`/api/v1/public/*`).
2. **Interactive 3D & Avatar**: Driven by Framer Motion and Three.js running in high-performance WebGL context.
3. **Appointment Booking**: Two-phase reservation: slot locking in MongoDB with atomic unique constraints, followed by Razorpay order generation and cryptographic verification.
4. **Admin CMS**: Protected via JWT Access Token (15m) + Refresh Token (7d) rotation with RoleGuard (`admin`).
