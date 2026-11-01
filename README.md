# RISHU JHA — PERSONAL DIGITAL UNIVERSE

[![Continuous Integration](https://github.com/CODZRISHU/rishu-digital-universe/actions/workflows/ci.yml/badge.svg)](https://github.com/CODZRISHU/rishu-digital-universe/actions/workflows/ci.yml)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/CODZRISHU/rishu-digital-universe)

A next-generation personal portfolio, interactive 3D universe, and autonomous management platform built for **Rishu Kumar Jha** (Programmer Analyst at Cognizant, Full-Stack Developer & AI Systems Engineer).

---

## Key Highlights

- **Digital Twin Standing Avatar**: High-fidelity, transparent background cutout of Rishu standing directly in the 3D cosmic pedestal with ambient floor contact shadows and interactive speech bubbles.
- **Weekend 1-on-1 Sessions Engine**: Direct free consultation bookings strictly hosted on weekends (Saturday & Sunday, 11:00 AM – 11:00 PM IST) with atomic slot locking.
- **Real-Time Telegram Alerts**: Instant mobile notifications dispatched to Telegram (+91 9304783530) for every booking and contact submission.
- **Open Mission Control Admin**: Pure tabular data view for reviewing and managing all incoming inquiries and appointment bookings in real-time.
- **Awwwards-Caliber Aesthetic**: Futuristic deep black `#050505` theme with neon purple `#A855F7` and cyan `#00D9FF` ambient accents.
- **Three.js Cosmos**: Interactive 3D particle cosmos and floating geometric prisms.
- **Full-Stack NestJS + MongoDB Core**: Complete REST API architecture with role-based JWT auth, refresh rotation, Swagger documentation, and atomic slot reservation.


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
