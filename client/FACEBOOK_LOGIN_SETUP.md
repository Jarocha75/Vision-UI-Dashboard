# Facebook Login Setup Guide

## 1. Vytvorenie Facebook App

### Krok 1: Facebook Developers
1. Choďte na [Facebook Developers](https://developers.facebook.com/)
2. Prihláste sa pomocou vášho Facebook účtu
3. Kliknite na "My Apps" a potom "Create App"

### Krok 2: Vytvorenie aplikácie
1. Vyberte **"Consumer"** ako typ aplikácie
2. Vyplňte:
   - **App Display Name**: Názov vašej aplikácie (napr. "My Dashboard")
   - **App Contact Email**: Váš email
3. Kliknite "Create App"

### Krok 3: Pridanie Facebook Login
1. V dashboarde vašej aplikácie nájdite **"Facebook Login"**
2. Kliknite "Set Up"
3. Vyberte **"Web"** ako platformu
4. Zadajte URL vašej aplikácie: `http://localhost:5173` (pre development)

### Krok 4: Konfigurácia Facebook Login
1. V ľavom menu choďte na **Settings → Basic**
2. Skopírujte **App ID**
3. V ľavom menu choďte na **Facebook Login → Settings**
4. Pridajte do **Valid OAuth Redirect URIs**:
   ```
   http://localhost:5173
   http://localhost:5173/auth/signup
   ```

### Krok 5: Nastavenie App Domain
1. V **Settings → Basic**
2. Pridajte do **App Domains**: `localhost`

## 2. Konfigurácia React Aplikácie

### Aktualizujte .env súbor
```env
VITE_API_BASE_URL="http://localhost:4000/api"
VITE_FACEBOOK_APP_ID="váš-facebook-app-id"
```

**Dôležité**: Po aktualizácii `.env` súboru musíte reštartovať dev server!

```bash
# Zastavte server (Ctrl+C) a znovu ho spustite
npm run dev
```

## 3. Backend Implementácia

Váš Express backend musí spracovať Facebook token:

```javascript
// POST /api/auth/facebook
router.post('/auth/facebook', async (req, res) => {
  const { token } = req.body; // Facebook access token z frontendu

  try {
    // 1. Overte Facebook token voči Facebook API
    const fbResponse = await axios.get(
      `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
    );

    const { id: facebookId, name, email } = fbResponse.data;

    // 2. Nájdite alebo vytvorte používateľa v databáze
    let user = await User.findOne({
      $or: [
        { facebookId },
        { email }
      ]
    });

    if (!user) {
      user = await User.create({
        name,
        email,
        facebookId,
        provider: 'facebook'
      });
    } else if (!user.facebookId) {
      // Link Facebook account k existujúcemu emailu
      user.facebookId = facebookId;
      user.provider = 'facebook';
      await user.save();
    }

    // 3. Vygenerujte JWT token
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Facebook login error:', error);
    res.status(401).json({
      message: 'Facebook authentication failed'
    });
  }
});
```

### Inštalujte potrebné balíčky v backende
```bash
npm install axios
```

## 4. Testovanie

### Development Testing
1. Spustite backend: `cd your-backend && npm run dev`
2. Spustite frontend: `cd My-dashboard && npm run dev`
3. Otvorte `http://localhost:5173/auth/signup`
4. Kliknite na Facebook ikonu
5. Prihláste sa pomocou Facebook testovacej účtu

### Vytvorenie test používateľov
1. V Facebook Developers dashboarde choďte na **Roles → Test Users**
2. Kliknite "Create Test Users"
3. Použite tieto účty pre testovanie

## 5. Production Setup

Pre production deployment:

### 1. Aktualizujte Facebook App Settings
```
Valid OAuth Redirect URIs:
- https://your-domain.com
- https://your-domain.com/auth/signup

App Domains:
- your-domain.com
```

### 2. Aktualizujte .env pre production
```env
VITE_API_BASE_URL="https://api.your-domain.com/api"
VITE_FACEBOOK_APP_ID="váš-facebook-app-id"
```

### 3. Facebook App Review
Pred spustením do produkcie musíte prejsť **App Review**:
1. V FB Developers choďte na **App Review**
2. Požiadajte o schválenie `email` a `public_profile` permissions
3. Poskytnite screenshoty a vysvetlenie ako používate Facebook Login

## 6. Bezpečnosť

### Frontend
- Facebook App ID nie je citlivá informácia (je verejná)
- Token sa posiela priamo z prehliadača na backend
- Token sa VŽDY overuje na backende

### Backend
- **NIKDY** nedôverujte tokenu bez overenia
- Vždy overte token voči Facebook Graph API
- Použite HTTPS v produkcii
- Nastavte krátku expiráciu pre JWT tokeny

## 7. Riešenie problémov

### "App Not Setup: This app is still in development mode"
- Pridajte svojho Facebook účtu do **Roles → Testers** v FB Developers

### "URL Blocked: This redirect failed because the redirect URI is not whitelisted"
- Skontrolujte **Valid OAuth Redirect URIs** v Facebook Login Settings
- Uistite sa, že URL presne zodpovedá (s/bez trailing slash)

### Facebook SDK sa nenačítal
- Skontrolujte console pre chyby
- Uistite sa, že `VITE_FACEBOOK_APP_ID` je nastavené
- Reštartujte dev server po zmene `.env`

### Backend vracia 401 error
- Overte že Facebook token je platný
- Skontrolujte backend logy
- Uistite sa, že axios je nainštalovaný

## 8. Užitočné linky

- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login/web)
- [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
- [Facebook App Review Process](https://developers.facebook.com/docs/app-review)
