RentEase – Full Stack Rental Agreement Platform
===============================================

Minimalist, editorial rental management experience designed for premium property developers. Frontend is React (Vite) with a bespoke aesthetic; backend is Node.js + Express + Prisma targeting MySQL.

Repository Layout
-----------------

- `frontend/` — React app with role-aware UI, mock auth bridge (to be swapped for JWT backend)
- `backend/` — Express API with Prisma models for users, properties, requests, agreements

Quick Start (Local)
-------------------

1. Frontend

```bash
cd frontend
npm install
npm run dev
```

2. Backend

```bash
cd backend
npm install
# create backend/.env before running (see below)
npm run dev
```

Environment & Database Setup
----------------------------

1. Provision MySQL (PlanetScale, Aiven, AWS RDS, etc.). Record the connection string.
2. Create `backend/.env` with:

```
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DB_NAME"
PORT=8080
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=replace-with-a-long-random-string
```

3. From `backend/`, run:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Seed data if desired (e.g., via Prisma Studio).

Backend API (Initial)
---------------------

- `POST /api/auth/signup` – create account (hashes password with bcrypt, returns JWT)
- `POST /api/auth/login` – authenticate (verifies password, returns JWT)
- `GET /api/auth/me` – fetch authenticated user (requires `Authorization: Bearer <token>`)
- `GET /api/health` – health check
- `GET /api/properties` – list properties with owner + request summary
- `POST /api/properties` – create property (requires landlord JWT; body `title`, `city`, `type`, `price`, optional `description`)
- `POST /api/rent/request` – tenant rental request (requires tenant JWT; body `propertyId`)
- `POST /api/rent/approve` – landlord approves request (requires landlord JWT; body `requestId`) and creates an agreement placeholder

Deployment Plan
---------------

- **Frontend**: Netlify  
  - Build command: `npm run build`  
  - Publish directory: `frontend/dist`  
  - `VITE_API_BASE` env var pointing to Render backend URL

- **Backend**: Render (Web Service)  
  - Install command: `npm install && npx prisma generate`  
  - Start command: `npm run start`  
  - Environment variables: `DATABASE_URL`, `PORT`, `CORS_ORIGIN`, future `JWT_SECRET`
  - Consider adding a Render cron job or background worker later for housekeeping tasks

- **Database**: Managed MySQL (PlanetScale/Neon for MySQL, etc.)  
  - Ensure the production DB URL is used in Render env vars  
  - Run `npx prisma migrate deploy` after deployment

Frontend Polish Summary
-----------------------

- Full-bleed hero with architectural photography + layered copy
- Feature trio, gallery strip, stats band, testimonials, final CTA
- Navigation refined to minimal, professional layout with subtle accents

Next Steps
----------

1. Implement real signup/login on the backend with bcrypt + JWT.
2. Replace mock frontend auth with API integration (store JWT, call `/api/auth/*`).
3. Connect property/request views to live backend data.
4. Deploy (Netlify + Render), run migrations on production DB.
5. Verify production signup/login, inspect DB for hashed password, validate JWT on jwt.io.

Project Proposal (Original Brief)
---------------------------------

1. **Project Title**  
   RentEase – A Secure Rental Agreement Management System with Blockchain Verification

2. **Problem Statement**  
   Managing rental agreements between tenants and landlords often involves paperwork, mistrust, and disputes about the authenticity of contracts. RentEase+ simplifies property rental workflows by digitizing listings, bookings, and agreements. A blockchain-backed verification layer ensures rental contracts cannot be tampered with, providing transparency and security to both parties.

3. **System Architecture**  
   - Frontend (React + React Router)  
   - Backend (Node.js + Express.js)  
   - Prisma ORM → Database (MySQL)  
   - Blockchain (Smart Contract)  
   - Hosting:  
     - Frontend → Vercel / Netlify  
     - Backend → Render / Railway  
     - Blockchain → Polygon Mumbai Testnet

5. **Key Features**

| Category | Features |
| --- | --- |
| Authentication & Authorization | Secure user registration and login (Firebase planned, now moving to JWT), role-based access for tenants/landlords |
| CRUD Operations | Landlords create/update/delete listings; tenants read listings and send rental requests |
| Advanced Listing Management | Search, sort, filter, paginate by price, city, property type |
| Rental Workflow | Tenants browse listings, send requests, view status; landlords approve/reject |
| Digital Agreements | Generate agreements once requests approved, store securely |
| Blockchain Verification (Future Scope) | Store contract hashes on blockchain to ensure authenticity/tamper detection |

6. **Tech Stack**

| Layer | Technologies |
| --- | --- |
| Frontend | React.js, React Router, Axios (planned) |
| Backend | Node.js, Express.js |
| Database | MySQL with Prisma ORM |
| Authentication | Firebase Authentication (initial plan), bcrypt & JWT (current direction) |
| Blockchain | Solidity Smart Contract, Ethers.js (future) |

7. **API Overview**

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| /api/auth/login | POST | User login using Firebase token verification (moving to JWT) | Public |
| /api/properties | GET | Fetch property listings | Public |
| /api/properties/:id | GET | Fetch property details | Public |
| /api/properties | POST | Create listing | Landlord |
| /api/properties/:id | PUT | Update listing | Landlord |
| /api/properties/:id | DELETE | Delete listing | Landlord |
| /api/rent/request/:id | POST | Tenant rental request | Tenant |


