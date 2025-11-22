# Troubleshooting Guide

## "Failed to fetch PayrollData" Error

If you're getting this error, follow these steps:

### 1. Check Backend Server is Running

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: ...
🚀 Server running on http://localhost:5000
```

### 2. Test Backend API Directly

Open in browser or use curl:
```bash
# Health check
curl http://localhost:5000/api/health

# Test payroll endpoint
curl http://localhost:5000/api/payroll
```

### 3. Check MongoDB Connection

Verify MongoDB is connected:
- Check backend console for "✅ MongoDB Connected"
- If you see "❌ MongoDB connection error", check your `.env` file

### 4. Verify Data in MongoDB

Check if payroll data exists:
```javascript
// In MongoDB shell or Compass
use PravaraHealthClinic1
db.payrolls.find().pretty()
```

### 5. Check Frontend .env File

Make sure `frontend/.env` exists with:
```env
VITE_API_URL=http://localhost:5000/api
```

### 6. Check Browser Console

Open browser DevTools (F12) and check:
- Network tab for failed requests
- Console tab for error messages
- Look for CORS errors

### 7. Common Issues

#### Issue: CORS Error
**Solution**: Backend CORS is already configured. Make sure backend is running.

#### Issue: Connection Refused
**Solution**: 
- Backend not running - start it with `npm run dev`
- Wrong port - check backend is on port 5000
- Firewall blocking - check firewall settings

#### Issue: Data Format Mismatch
**Solution**: The controller now handles missing/null fields. Check backend logs for formatting errors.

#### Issue: Empty Response
**Solution**: 
- Check MongoDB has data
- Check backend logs for "Found X payroll records"
- Verify database name matches in `.env`

### 8. Debug Steps

1. **Check Backend Logs**: Look for error messages in backend console
2. **Check Network Tab**: See the actual API response
3. **Test API Directly**: Use Postman or curl to test endpoints
4. **Check MongoDB**: Verify data exists in database

### 9. Quick Test

Run this in browser console when on payroll page:
```javascript
fetch('http://localhost:5000/api/payroll')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

This will show you the exact error from the API.

