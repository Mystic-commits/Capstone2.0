1. Project Title

RentEase – A Secure Rental Agreement Management System with Blockchain Verification

2. Problem Statement

Managing rental agreements between tenants and landlords often involves paperwork, mistrust, and disputes about the authenticity of contracts. RentEase+ simplifies property rental workflows by digitizing listings, bookings, and agreements. A blockchain-backed verification layer ensures rental contracts cannot be tampered with, providing transparency and security to both parties.

3. System Architecture

Frontend (React + React Router)

        ↓ 

Backend (Node.js + Express.js)

        ↓ Mongoose ODM

Database (MongoDB Atlas)

        ↓

Blockchain (Smart Contract)

       Hosting:

Frontend → Vercel / Netlify

Backend → Render / Railway

Database → MongoDB Atlas

Blockchain → Polygon Mumbai Testnet

5. Key Features

| Category | Features |
|----------|----------|
| Authentication & Authorization | Secure user registration and login via JWT Authentication. Role-based access for tenants and landlords. |
| CRUD Operations | Landlords can create, update, and delete property listings. Tenants can read listings and send rental requests. |
| Advanced Listing Management | Search, sort, filter, and paginate listings by parameters like price, city, and property type for better discoverability. |
| Rental Workflow | Tenants can browse listings, send rent requests, and view approval status. Landlords can approve or reject these requests. |
| Digital Agreements | Automatically generate rental agreements once a request is approved, stored securely in the system. |
| Blockchain Verification (Future Scope) | Planned integration to store contract hashes on the blockchain, ensuring agreement authenticity and tamper detection. |

6. Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React.js, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas with Mongoose ODM |
| Authentication | JWT (JSON Web Tokens), bcryptjs for password hashing |
| Blockchain (Scope) | Solidity Smart Contract, Ethers.js |

7. API Overview

| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| /api/auth/login | POST | User login using JWT token verification | Public |
| /api/properties | GET | Fetch all property listings (supports search, sort, filter, pagination) | Public |
| /api/properties/:id | GET | Fetch specific property details | Public |
| /api/properties | POST | Create a new property listing | Landlord Only |
| /api/properties/:id | PUT | Update a property listing | Landlord Only |
| /api/properties/:id | DELETE | Delete a property listing | Landlord Only |
| /api/rent/request/:id | POST | Tenant requests to rent a property | Tenant Only |
