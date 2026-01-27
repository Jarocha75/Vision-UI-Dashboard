# Vision UI Dashboard - Frontend

Modern React dashboard application built with Vite, TypeScript, and Material UI.

## Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **TypeScript** - Type safety
- **Material UI (MUI) 7** - Component library
- **React Router 7** - Client-side routing
- **React Query (TanStack Query)** - Server state management
- **React Hook Form + Zod** - Form handling and validation
- **i18next** - Internationalization (EN/SK)
- **Recharts** - Data visualization
- **Axios** - HTTP client

## Features

- User authentication (Email, Google OAuth)
- Dashboard with analytics and charts
- User profile management
- Billing and invoices management
- Payment methods management
- Transactions tracking
- Multi-language support (English, Slovak)
- Responsive design

## Prerequisites

- Node.js 20+
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── assets/          # Images, icons, logos
├── components/      # Reusable UI components
│   ├── auth/        # Authentication components
│   ├── billing/     # Billing related components
│   ├── cards/       # Dashboard cards
│   ├── common/      # Shared components
│   ├── profile/     # Profile components
│   ├── settings/    # Settings components
│   └── tables/      # Table components
├── context/         # React context providers
├── data/            # Static data and configurations
├── hooks/           # Custom React hooks
├── i18n/            # Internationalization
├── layouts/         # Page layouts
├── pages/           # Page components
├── services/        # API services
├── types/           # TypeScript types
├── utils/           # Utility functions
└── validation/      # Zod validation schemas
```

## Authentication

### Token Management
- JWT token stored in `localStorage`
- Automatic token injection via axios interceptor
- Automatic logout on token expiration

### Supported Methods
1. **Email/Password** - Classic registration and login
2. **Google OAuth** - Sign in with Google account

## API Integration

The frontend communicates with the backend API running on port 4000. Configure the API URL in the `.env` file.

### Required Backend Endpoints

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registration
- `GET /api/auth/me` - Current user
- `POST /api/auth/google` - Google OAuth
