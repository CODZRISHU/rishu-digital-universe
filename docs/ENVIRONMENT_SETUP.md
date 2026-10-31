# Environment Setup Guide

## Local Development Requirements
- **Node.js**: >= 20.10.0
- **NPM**: >= 10.x
- **MongoDB**: v7.0.x running locally on `localhost:27017` or MongoDB Atlas URI

## Step-by-Step Local Setup
```bash
# 1. Clone repository
git clone https://github.com/CODZRISHU/rishu-digital-universe.git
cd rishu-digital-universe

# 2. Install monorepo dependencies
npm install

# 3. Compile shared TypeScript contracts
npm --workspace=packages/shared-types run build

# 4. Populate database with Rishu Kumar Jha's verified profile & project data
npm run seed

# 5. Launch both API (port 5000) and Web (port 5173) concurrently
npm run dev
```

## Default Credentials
- **Admin Email**: `shivayjha7@gmail.com`
- **Initial Password**: `RishuUniverse2025!Secure`
- **Admin Dashboard Route**: `http://localhost:5173/admin`
- **Swagger Documentation**: `http://localhost:5000/api/docs`
