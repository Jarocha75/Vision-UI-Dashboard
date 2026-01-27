# Vision UI Dashboard - Backend

Node.js + Express REST API with Prisma ORM and MySQL database.

## Tech Stack

- **Node.js 20** - Runtime environment
- **Express 5** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM for database access
- **MySQL 8** - Database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Multer** - File uploads
- **Stripe** - Payment processing
- **Google Auth Library** - Google OAuth

## Features

- User authentication (Email/Password, Google OAuth)
- JWT-based authorization with refresh tokens
- User profile management with avatar uploads
- Billing information management
- Payment methods (credit cards)
- Transactions tracking
- Invoices management
- Search functionality

## Prerequisites

- Node.js 20+
- Docker & Docker Compose
- MySQL 8 (or use Docker)

## Installation

### With Docker (Recommended)

```bash
# Copy environment variables
cp .env.example .env
# Edit .env with your values

# Start all services (MySQL + Backend)
docker-compose up -d

# Run database migrations
docker-compose exec backend npx prisma migrate deploy

# Seed the database (optional)
docker-compose exec backend npx prisma db seed
```

### Without Docker

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your values (including DATABASE_URL)

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Start development server
npm run dev
```

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/dashboard_db
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=dashboard_db
MYSQL_USER=dashboard_user
MYSQL_PASSWORD=dashboard_pass

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# Server
PORT=4000
NODE_ENV=development
```

## Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend

# Rebuild backend
docker-compose up -d --build backend

# Access MySQL CLI
docker-compose exec mysql mysql -u root -p
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/google` | Google OAuth login |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/auth/me` | Get current user |

### User Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user/profile` | Get user profile |
| PUT | `/api/user/profile` | Update user profile |
| POST | `/api/user/avatar` | Upload avatar |

### Billing
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/billings` | Get billing info |
| PUT | `/api/billings` | Update billing info |

### Payment Methods
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payment-methods` | Get payment methods |
| POST | `/api/payment-methods` | Add payment method |
| PUT | `/api/payment-methods/:id` | Update payment method |
| DELETE | `/api/payment-methods/:id` | Delete payment method |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Get transactions |
| POST | `/api/transactions` | Create transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |

### Invoices
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/invoices` | Get invoices |
| POST | `/api/invoices` | Create invoice |
| PUT | `/api/invoices/:id` | Update invoice |
| DELETE | `/api/invoices/:id` | Delete invoice |

## Project Structure

```
src/
├── index.ts           # Application entry point
├── generated/         # Prisma generated client
├── middleware/        # Express middlewares
│   ├── auth.ts        # JWT authentication
│   └── upload.ts      # File upload handling
├── routes/            # API routes
│   ├── auth.ts        # Authentication routes
│   ├── user.ts        # User routes
│   ├── billings.ts    # Billing routes
│   ├── payment-method.ts
│   ├── transactions.ts
│   ├── invoices.ts
│   └── search.ts
└── utils/
    └── tokens.ts      # JWT token utilities

prisma/
├── schema.prisma      # Database schema
├── migrations/        # Database migrations
└── seed.ts           # Database seeding
```

## Database Schema

Main models:
- **User** - User accounts and profiles
- **ClientInfo** - Billing information
- **PaymentMethod** - Credit cards
- **Transaction** - Financial transactions
- **Invoice** - User invoices

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npx prisma generate` | Generate Prisma client |
| `npx prisma migrate dev` | Create new migration |
| `npx prisma migrate deploy` | Apply migrations |
| `npx prisma studio` | Open Prisma Studio GUI |
| `npx prisma db seed` | Seed database |
