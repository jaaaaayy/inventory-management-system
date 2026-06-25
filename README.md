# Inventory Management System

A multi-tenant inventory management web app. Each organization gets its own isolated data, role-based access for team members (Owner / Admin / Member), and a full workflow for managing stock — products, vendors, customers, purchase orders, sales orders, and a stock-movement history.

**Stack:** React 19 + TypeScript (Vite) on the frontend, Express 5 + MongoDB on the backend, with session-based auth and AWS S3 for product images.

---

## Features

- **Multi-tenancy** — every record is scoped to an organization, so each tenant's data is fully isolated. Registering creates your organization and makes you its Owner.
- **Role-based access control** — three built-in roles (Owner, Admin, Member) with granular per-resource permissions enforced on every endpoint.
- **Team invitations** — invite members by email with secure, expiring invite links.
- **Inventory & orders** — products with SKUs, categories, reorder points, and images; purchase orders (stock in) and sales orders (stock out) with status workflows.
- **Stock-movement history** — every change (sale, purchase, adjustment, cancellation) is recorded with the amount, resulting quantity, reason, and who made it.
- **Secure by default** — bcrypt password hashing, session auth, Helmet, CORS, rate limiting, and request validation.

---

## Tech Stack

| Layer | Technologies |
| --- | --- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui + Radix UI, TanStack Query & Table, React Router, React Hook Form + Zod, Recharts |
| **Backend** | Node.js, Express 5, Mongoose 8, express-session + connect-mongo, bcrypt, Multer, AWS SDK v3 (S3) |
| **Database** | MongoDB |
| **Storage** | AWS S3 (product images) |

---

## Getting Started

### Prerequisites

- **Node.js 22+** and npm
- A **MongoDB** connection — a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or a local `mongod`
- **AWS S3** credentials and a bucket — required for product image uploads
- **git**

### 1. Clone

```bash
git clone https://github.com/<your-username>/inventory-management-system.git
cd inventory-management-system
```

### 2. Start the backend → http://localhost:3000

```bash
cd server
npm install
cp .env.example .env.local    # then fill in the values (see Environment Variables below)
npm run dev
```

The server seeds the default roles and permissions on first boot.

### 3. Start the frontend → http://localhost:5173

```bash
cd client
npm install
cp .env.example .env.local    # set VITE_API_URL=http://localhost:3000
npm run dev
```

Open **http://localhost:5173**.

### 4. First run

1. **Register** — this creates your organization and makes you its Owner.
2. **Invite** teammates from the members area (assign Admin or Member).
3. Add **categories**, **vendors**, and **products**.
4. Create **purchase orders** to bring stock in and **sales orders** to send it out — inventory and stock history update automatically.

---

## Environment Variables

### Backend (`server/.env.local`)

| Variable | Required | Description |
| --- | --- | --- |
| `NODE_ENV` | No | `development` or `production`. |
| `PORT` | No | API port. Defaults to `3000`. |
| `MONGODB_URI` | **Yes** | MongoDB connection string (Atlas or local). |
| `CLIENT_URL` | **Yes** | Frontend origin — `http://localhost:5173` in development. |
| `SESSION_SECRET` | **Yes** | Long random string used to sign session cookies. |
| `AWS_REGION` | **Yes** | AWS region of the S3 bucket. |
| `AWS_S3_BUCKET` | **Yes** | S3 bucket name for product images. |
| `AWS_ACCESS_KEY_ID` | **Yes** | AWS access key (for local development). |
| `AWS_SECRET_ACCESS_KEY` | **Yes** | AWS secret key. |
| `AWS_S3_PUBLIC_URL` | No | Custom public/CDN base URL for images (e.g. CloudFront). |

> `npm run dev` loads `.env.local`; `npm start` loads `.env.production`.

### Frontend (`client/.env.local`)

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | **Yes** | Base URL of the backend API (e.g. `http://localhost:3000`). |

---

## Scripts

**Backend (`server/`)**

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API with auto-reload (nodemon). |
| `npm start` | Start the API in production mode. |

**Frontend (`client/`)**

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server. |
| `npm run build` | Type-check and build for production. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |

---

## Project Structure

Both the frontend and backend use a **feature-folder layout**, keeping each domain (products, orders, members, …) self-contained.

```
inventory-management-system/
│
├── client/                       # React 19 + TypeScript SPA (Vite)
│   └── src/
│       ├── assets/               # Static assets
│       ├── components/           # Shared UI (shadcn/ui in components/ui, sidebar, header, …)
│       ├── config/               # Env + API URL configuration
│       ├── context/              # User/auth context + provider
│       ├── features/             # Feature modules: auth, products, categories, vendors,
│       │                         #   customers, purchase-orders, sales-orders,
│       │                         #   stock-movements, dashboard, reports, team, organization
│       ├── hooks/                # Custom hooks (use-user, use-has-permission, …)
│       ├── layouts/              # App + auth layouts
│       ├── lib/                  # Helpers (csv, images, utils)
│       ├── routes/               # Protected / public route guards
│       ├── shared/               # Shared Zod schemas
│       ├── App.tsx
│       ├── main.tsx
│       └── providers.tsx         # React Query, theme, and context providers
│
├── server/                       # Express 5 REST API + MongoDB
│   ├── src/
│   │   ├── config/               # env, database, S3, RBAC seeding, upload
│   │   ├── auth/                 # Register / login / session
│   │   ├── invitation/           # Organization invitations
│   │   ├── organization/         # Organizations (tenants)
│   │   ├── organizationMember/   # Membership (user ↔ organization ↔ role)
│   │   ├── position/  permission/# Roles and permissions (RBAC)
│   │   ├── product/  category/  vendor/  customer/
│   │   ├── inventory/  stockMovement/
│   │   ├── purchaseOrder/  purchaseItem/
│   │   ├── salesOrder/  salesItem/
│   │   ├── user/                 # Platform user accounts
│   │   ├── services/             # S3 storage service
│   │   ├── utils/                # Middlewares, rate limiters
│   │   ├── routes.js             # Mounts all feature routers under /api
│   │   └── index.js              # App entry — seeds RBAC, starts the server
│   └── ecosystem.config.cjs      # PM2 process config
│
└── .github/workflows/            # CI/CD (deploy frontend & backend)
```

Each backend feature folder contains a co-located `*.model.js`, `*.controller.js`, and `*.routes.js`.
