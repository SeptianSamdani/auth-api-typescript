# Auth API - TypeScript + Express + PostgreSQL

REST API with authentication using JWT, built with TypeScript, Express, and PostgreSQL.

## Features
- User registration & login
- JWT authentication
- Role-based access control
- Password hashing (bcrypt)
- Input validation (Zod)
- Database migrations

## Tech Stack
- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Auth:** JWT + bcrypt
- **Validation:** Zod

## Prerequisites
- Node.js 18+
- PostgreSQL 14+

## Installation

```bash
# Clone & install
npm install

# Setup environment
cp .env.example .env
# Edit .env with your database credentials
```

## Environment Variables

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/auth_api_dev
JWT_SECRET=your-super-secret-key
```

## Database Setup

```bash
# Run migrations
npm run migrate:up

# Seed dummy data (optional)
npm run seed

# Rollback migrations
npm run migrate:down
```

## Running

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## API Endpoints

### Public Routes
```
POST /api/auth/register - Register new user
POST /api/auth/login    - Login user
```

### Protected Routes (requires Bearer token)
```
GET  /api/users/profile - Get user profile
PUT  /api/users/profile - Update profile
```

### Admin Only Routes
```
GET  /api/users         - Get all users
```

## Request Examples

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"123456"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"123456"}'
```

### Get Profile (with token)
```bash
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── db/             # Database & migrations
├── middlewares/    # Custom middlewares
├── models/         # Data models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
├── validators/     # Input validation schemas
├── app.ts          # Express app setup
└── server.ts       # Server entry point
```

## Scripts

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Compile TypeScript
npm start           # Start production server
npm run migrate:up   # Run database migrations
npm run migrate:down # Rollback migrations
npm run seed        # Seed database with dummy data
```

## License
ISC
```

**File:** `.env.example`
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/auth_api_dev
JWT_SECRET=change-this-to-a-secure-random-string