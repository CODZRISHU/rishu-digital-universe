# RISHU JHA — PERSONAL DIGITAL UNIVERSE

A next-generation personal portfolio, interactive 3D universe, and autonomous management platform built for **Rishu Kumar Jha** (Programmer Analyst at Cognizant, Full-Stack Developer & AI Systems Engineer).

---

## Key Highlights

- **Awwwards-Caliber Aesthetic**: Futuristic deep black `#050505` theme with neon purple `#A855F7` and cyan `#00D9FF` ambient accents.
- **AI Vector Avatar Engine**: Fully custom SVG avatar modeled from Rishu's real photograph with dynamic expression shifts (`happy`, `thinking`, `wave`, `celebrate`) and cursor-tracking iris movement.
- **Three.js Cosmos**: Interactive 3D particle cosmos and floating geometric prisms.
- **Full-Stack NestJS + MongoDB Core**: Complete REST API architecture with role-based JWT auth, refresh rotation, Swagger documentation, and atomic slot reservation.
- **End-to-End Booking & Razorpay**: Real appointment scheduling engine with concurrency protection, slot locking, and cryptographic webhook payment verification.
- **Private Admin CMS Dashboard**: Comprehensive portal to manage profile, projects, experiences, skills, certifications, bookings, revenue, and messages.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18/19, TypeScript, Vite, Tailwind CSS, Framer Motion, Three.js, React Three Fiber, Drei, Lenis, Lucide React, TanStack Query, React Hook Form, Zod |
| **Backend** | NestJS, TypeScript, Mongoose, MongoDB, Passport JWT, Swagger OpenAPI, Razorpay SDK, Nodemailer |
| **Shared** | Monorepo structure, `@rishu/shared-types` shared TypeScript contracts |
| **DevOps** | Docker, Docker Compose, Nginx, GitHub Actions CI/CD |

---

## Quick Start

### 1. Prerequisites
- Node.js >= 20.x
- MongoDB running locally or MongoDB Atlas connection URI

### 2. Install Dependencies
```bash
npm install
```

### 3. Seed Database with Verified Profile Data
```bash
npm run seed
```

### 4. Run Locally
```bash
npm run dev
```
- **Web Portfolio**: [http://localhost:5173](http://localhost:5173)
- **API Server**: [http://localhost:5000](http://localhost:5000)
- **Swagger API Docs**: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)
- **Admin Dashboard**: [http://localhost:5173/admin](http://localhost:5173/admin)
