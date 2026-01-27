# Backend Integration Guide

## Konfigurácia

Aplikácia je nakonfigurovaná na komunikáciu s Express backendom bežiacim na `http://localhost:4000`.

### Premenné prostredia

V súbore `.env`:
```
VITE_API_BASE_URL="http://localhost:4000/api"
```

## Konfigurácia Environment Variables

V súbore `.env` máte nasledovné premenné:

```env
VITE_API_BASE_URL="http://localhost:4000/api"
VITE_FACEBOOK_APP_ID="your-facebook-app-id-here"
```

**Poznámka**: Po úprave `.env` súboru musíte reštartovať dev server (Ctrl+C a `npm run dev`).

## API Endpointy

### Autentifikácia

#### 1. Login
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com"
  }
}
```

#### 2. Registrácia
```
POST /api/auth/register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com"
  }
}
```

#### 3. Získanie aktuálneho používateľa
```
GET /api/auth/me
Authorization: Bearer {token}

Response:
{
  "id": "user-id",
  "email": "user@example.com"
}
```

#### 4. Facebook Login
```
POST /api/auth/facebook
Content-Type: application/json

Body:
{
  "token": "facebook-access-token-from-sdk"
}

Response:
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Poznámka**: Pre detailnú dokumentáciu Facebook Login implementácie pozrite [FACEBOOK_LOGIN_SETUP.md](FACEBOOK_LOGIN_SETUP.md)

## Autentifikačný Flow

### 1. Token Storage
- JWT token sa ukladá do `localStorage` pod kľúčom `auth_token`
- Token sa automaticky pridáva do každého API requestu cez axios interceptor

### 2. Axios Interceptors

#### Request Interceptor
- Automaticky pridáva `Authorization: Bearer {token}` header ku všetkým requestom

#### Response Interceptor
- Zachytáva 401 chyby (Unauthorized)
- Automaticky odhlási používateľa a presmeruje na login stránku
- Extrahuje error správy z API odpovedí

### 3. Error Handling

Aplikácia správne spracováva:
- Network errors
- HTTP status codes (400, 401, 403, 404, 500)
- Backend validation errors
- Custom error messages z API

## Štruktúra súborov

```
src/
├── services/
│   ├── apiClient.ts           # Axios konfigurácia
│   ├── auth.ts                # Autentifikačné API volania
│   └── setupInterceptors.ts   # Axios interceptors
├── context/
│   ├── authContext.ts         # Auth context definícia
│   ├── AuthProvider.tsx       # Auth provider implementácia
│   └── useAuth.ts             # Auth hook
└── utils/
    └── errorHandler.ts        # Error handling utility
```

## Spustenie

1. Spustite Express backend na porte 4000:
```bash
cd your-backend-folder
npm run dev
```

2. Spustite React aplikáciu:
```bash
cd My-dashboard
npm run dev
```

## Potrebné Express Backend Endpointy

Váš Express backend by mal implementovať nasledovné endpointy:

```javascript
// POST /api/auth/login
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  // Validácia a autentifikácia
  res.json({ token, user });
});

// POST /api/auth/register
router.post('/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  // Vytvorenie používateľa
  res.json({ token, user });
});

// GET /api/auth/me
router.get('/auth/me', authenticateToken, async (req, res) => {
  // Vráti aktuálneho používateľa z JWT tokenu
  res.json(req.user);
});

// POST /api/auth/facebook
router.post('/auth/facebook', async (req, res) => {
  const { token } = req.body;
  // Overenie Facebook tokenu a prihlásenie
  res.json({ token, user });
});
```

## Middleware pre autentifikáciu

```javascript
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}
```

## CORS Konfigurácia

V Express backende nezabudnite nakonfigurovať CORS:

```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true
}));
```
