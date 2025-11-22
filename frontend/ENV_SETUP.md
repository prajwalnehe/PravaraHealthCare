# Frontend Environment Variables Setup

## Quick Setup

1. **Create `.env` file** in the `frontend` directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

2. **For different environments**, you can create:
   - `.env.development` - Development environment
   - `.env.production` - Production environment
   - `.env.local` - Local overrides (gitignored)

## Environment Variables

### Required Variables

- `VITE_API_URL` - Backend API base URL
  - Default: `http://localhost:5000/api`
  - Production: Your deployed backend URL (e.g., `https://api.yourdomain.com/api`)

### Optional Variables

You can add custom variables with the `VITE_` prefix:

```env
VITE_APP_NAME=Pravara Health Clinic
VITE_APP_VERSION=1.0.0
```

## Important Notes

1. **VITE_ Prefix Required**: All environment variables must be prefixed with `VITE_` to be accessible in your React code
2. **Restart Dev Server**: After changing `.env` file, restart your Vite dev server
3. **Build Time**: Environment variables are embedded at build time, not runtime

## Usage in Code

Access environment variables in your code:

```javascript
// In your code
const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;
```

## Example Configurations

### Development
```env
VITE_API_URL=http://localhost:5000/api
```

### Production
```env
VITE_API_URL=https://api.pravarahealth.com/api
```

### Staging
```env
VITE_API_URL=https://staging-api.pravarahealth.com/api
```

