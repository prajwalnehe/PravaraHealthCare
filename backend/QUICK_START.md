# Quick Start Guide - Fix "Failed to fetch" Error

## ⚠️ IMPORTANT: Port Configuration

The backend now runs on **port 5000** by default (matching frontend).

## Step-by-Step Fix

### 1. Check Backend Port
Make sure your `.env` file in `backend/` has:
```env
PORT=5000
```

Or the backend will use port 5000 by default.

### 2. Start Backend Server
```bash
cd backend
npm run dev
```

**You should see:**
```
🔄 Attempting to connect to MongoDB...
✅ MongoDB Connected: cluster0.lfxbvrg.mongodb.net
📊 Database: PravaraHealthClinic1
🚀 Server running on http://localhost:5000
📊 API endpoints available at http://localhost:5000/api
🔗 Health check: http://localhost:5000/api/health
```

### 3. Test Backend is Working
Open in browser:
```
http://localhost:5000/api/health
```

Should return:
```json
{
  "success": true,
  "status": "ok",
  "message": "Pravara Health Clinic API is running"
}
```

### 4. Test Payroll Endpoint
```
http://localhost:5000/api/payroll/test
```

This shows database connection and data structure.

### 5. Check Frontend .env
Make sure `frontend/.env` exists:
```env
VITE_API_URL=http://localhost:5000/api
```

### 6. Restart Frontend
After creating/updating `.env`:
```bash
cd frontend
npm run dev
```

## Common Issues

### Issue: "Failed to fetch"
**Causes:**
1. Backend not running → Start with `npm run dev` in backend folder
2. Wrong port → Backend should be on port 5000
3. Frontend .env missing → Create `frontend/.env` with `VITE_API_URL=http://localhost:5000/api`

### Issue: Port Already in Use
If port 5000 is taken:
1. Change `PORT=5001` in `backend/.env`
2. Update `VITE_API_URL=http://localhost:5001/api` in `frontend/.env`
3. Restart both servers

### Issue: MongoDB Connection Failed
Check backend console for:
- `✅ MongoDB Connected` = Good
- `❌ MongoDB connection error` = Check connection string

## Verification Checklist

- [ ] Backend server running on port 5000
- [ ] MongoDB connected (see ✅ in backend console)
- [ ] `/api/health` returns success
- [ ] `/api/payroll/test` shows database connection
- [ ] Frontend `.env` file exists with correct URL
- [ ] Frontend restarted after creating `.env`

## Quick Test Commands

```bash
# Test backend health
curl http://localhost:5000/api/health

# Test payroll data
curl http://localhost:5000/api/payroll/test

# Test payroll endpoint
curl http://localhost:5000/api/payroll
```

If all these work, the frontend should work too!

