# Deployment Guide

## Production Topology
- **Frontend**: Vercel / Netlify / Cloudflare Pages (dist output from `apps/web`)
- **Backend API**: Render / AWS ECS / Railway / DigitalOcean (NestJS from `apps/api`)
- **Database**: MongoDB Atlas (M0 Free or Dedicated Cluster)
- **Payment Gateway**: Razorpay (Live API Keys & Webhook Secret)

## Containerized Deployment with Docker Compose
```bash
# Build and run MongoDB, NestJS API, and Web Nginx reverse proxy
docker-compose up --build -d
```

## Manual Staging / Production Steps
1. Configure `.env.production` from `.env.production.example`.
2. Connect MongoDB Atlas connection string to `MONGODB_URI`.
3. Seed production database:
   ```bash
   npm run seed
   ```
4. Build all workspaces:
   ```bash
   npm run build
   ```
5. Launch backend:
   ```bash
   npm run start:prod --workspace=apps/api
   ```
