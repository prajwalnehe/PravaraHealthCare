# Pravara Health Clinic - Full Stack Application

Complete health clinic management system with React frontend and Node.js/Express backend.

## Project Structure

```
PravaraHealthClinic/
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── routes/        # React Router setup
│   │   └── utils/         # API utilities
│   └── package.json
│
├── backend/               # Node.js + Express backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── controllers/     # Business logic
│   ├── middleware/      # Request middleware
│   ├── config/          # Configuration
│   ├── server.js        # Express server
│   └── package.json
│
├── FRONTEND_INTEGRATION.md  # How to connect frontend to backend
└── PROJECT_OVERVIEW.md      # This file
```

## Features

### Frontend
- ✅ Modern React UI with neon theme
- ✅ Dashboard with analytics
- ✅ Employee management
- ✅ Payroll management
- ✅ Expense tracking
- ✅ Financial analytics
- ✅ Responsive design

### Backend
- ✅ RESTful API
- ✅ MongoDB database
- ✅ Employee CRUD operations
- ✅ Payroll management
- ✅ Expense tracking
- ✅ Financial analytics endpoints
- ✅ CORS enabled
- ✅ Error handling

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
# Create .env file (see backend/SETUP.md)
npm run dev     # Start server
```

Backend runs on: `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
# Create .env file with VITE_API_URL=http://localhost:5000/api
npm run dev     # Start frontend
```

Frontend runs on: `http://localhost:5173` (or Vite default port)

### 3. Database

- MongoDB required
- Local: `mongodb://localhost:27017/pravara-health-clinic`
- Or use MongoDB Atlas (cloud)

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/dashboard/overview` | GET | Dashboard overview |
| `/api/dashboard/hiring` | GET | Hiring dashboard |
| `/api/employees` | GET | All employees |
| `/api/employees/:id` | GET/PUT/DELETE | Employee operations |
| `/api/payroll` | GET | All payroll records |
| `/api/payroll/summary` | GET | Payroll summary |
| `/api/expenses` | GET | All expenses |
| `/api/expenses/summary` | GET | Expense summary |
| `/api/financial/analytics` | GET | Financial analytics |

## Technology Stack

### Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- Recharts (for charts)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- CORS
- dotenv

## Next Steps

1. **Connect Frontend to Backend**
   - See `FRONTEND_INTEGRATION.md`
   - Update components to use API calls instead of hardcoded data

2. **Add Authentication** (Optional)
   - JWT tokens
   - User login/register
   - Protected routes

3. **Add Validation** (Optional)
   - Input validation
   - Data sanitization
   - Error messages

4. **Deploy** (Optional)
   - Backend: Heroku, Railway, or Vercel
   - Frontend: Vercel, Netlify
   - Database: MongoDB Atlas

## Documentation

- `backend/README.md` - Backend API documentation
- `backend/SETUP.md` - Backend setup guide
- `FRONTEND_INTEGRATION.md` - Frontend-backend integration
- `frontend/README.md` - Frontend documentation

## Support

For issues or questions:
1. Check the documentation files
2. Verify MongoDB is running
3. Check API endpoints in browser/Postman
4. Review console logs for errors

