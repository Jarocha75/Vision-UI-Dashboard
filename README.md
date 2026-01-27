# Vision UI Dashboard

Full-stack dashboard application with React frontend and Node.js backend.

## Project Structure

```
Visio-UI-Dashboard/
├── client/          # React frontend (Vite + TypeScript + MUI)
├── server/          # Node.js backend (Express + Prisma + MySQL)
└── README.md
```

## Tech Stack

### Frontend (`/client`)
- React 19 + TypeScript
- Vite 7
- Material UI 7
- React Query
- React Router
- i18next

### Backend (`/server`)
- Node.js 20 + TypeScript
- Express 5
- Prisma ORM
- MySQL 8
- JWT Authentication
- Docker

## Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose

### 1. Start Backend (with Docker)

```bash
cd server

# Copy environment variables
cp .env.example .env
# Edit .env with your values

# Start MySQL and Backend
docker-compose up -d
```

Backend will be available at `http://localhost:4000`

### 2. Start Frontend

```bash
cd client

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

Frontend will be available at `http://localhost:5173`

## Documentation

- [Frontend README](client/README.md) - Frontend setup and documentation
- [Backend README](server/README.md) - Backend setup and API documentation

## Features

- User authentication (Email, Google OAuth)
- Dashboard with analytics and charts
- User profile management
- Billing and payment methods
- Transactions and invoices
- Multi-language support (EN/SK)
- Responsive design

## Development

### Running Both Services

Terminal 1 - Backend:
```bash
cd server && docker-compose up
```

Terminal 2 - Frontend:
```bash
cd client && npm run dev
```

### Environment Variables

See `.env.example` files in both `client/` and `server/` directories.

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set root directory to `client`
3. Configure environment variables
4. Deploy

### Backend
The backend requires a persistent server (not serverless). Options:
- Railway
- Render
- DigitalOcean App Platform
- AWS/GCP/Azure

## License

MIT
