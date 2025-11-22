# API Testing Guide for Postman

## Base URL
```
http://localhost:5000/api
```

## Health Check

### GET /api/health
**URL:** `http://localhost:5000/api/health`

**Expected Response:**
```json
{
  "success": true,
  "status": "ok",
  "message": "Pravara Health Clinic API is running"
}
```

---

## Payroll APIs

### 1. Get All Payroll Records
**Method:** `GET`  
**URL:** `http://localhost:5000/api/payroll`

**Query Parameters (optional):**
- `month`: Filter by month (e.g., "January")
- `year`: Filter by year (e.g., 2025)

**Example:**
```
GET http://localhost:5000/api/payroll
GET http://localhost:5000/api/payroll?year=2025
GET http://localhost:5000/api/payroll?month=January&year=2025
```

**Expected Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": "EMP-001",
      "name": "Dr. Kavita Kulkarni",
      "monthlySalary": "₹2,50,000",
      "annualPackage": "₹30,00,000",
      "mobileRecharge": "₹999",
      "fuelExpense": "₹12,500 · MH12 AB 1023",
      "monthlyIncentive": "₹35,000",
      "giftVoucher": "₹5,000"
    }
  ]
}
```

---

### 2. Get Payroll Summary
**Method:** `GET`  
**URL:** `http://localhost:5000/api/payroll/summary`

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "totalMonthly": 998000,
    "totalAnnual": 11976000,
    "averageMonthly": 99800,
    "highestMonthly": 250000,
    "employeeCount": 10
  }
}
```

---

### 3. Get Total Salaries Breakdown
**Method:** `GET`  
**URL:** `http://localhost:5000/api/payroll/total-salaries`

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "totalMonthlySalary": 998000,
    "totalRecharge": 6990,
    "totalIncentives": 101500,
    "totalVouchers": 20100,
    "totalFuel": 62500,
    "employeeCount": 10
  }
}
```

---

### 4. Test Payroll Data (Debug Endpoint)
**Method:** `GET`  
**URL:** `http://localhost:5000/api/payroll/test`

**Expected Response:**
```json
{
  "success": true,
  "database": {
    "status": "connected",
    "readyState": 1,
    "name": "PravaraHealthClinic1",
    "host": "cluster0.lfxbvrg.mongodb.net"
  },
  "data": {
    "count": 10,
    "sample": {
      "employeeId": "EMP-001",
      "employeeName": "Dr. Kavita Kulkarni",
      "monthlySalary": 250000,
      "annualPackage": 3000000,
      "fuelExpense": { "amount": 12500, "vehicleNumber": "MH12 AB 1023" },
      "fuelExpenseType": "object",
      "isFuelExpenseObject": true
    }
  }
}
```

---

### 5. Create Payroll Record
**Method:** `POST`  
**URL:** `http://localhost:5000/api/payroll`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "employeeId": "EMP-011",
  "employeeName": "John Doe",
  "monthlySalary": 50000,
  "annualPackage": 600000,
  "mobileRecharge": 500,
  "fuelExpense": {
    "amount": 3000,
    "vehicleNumber": "MH12 XY 1234"
  },
  "monthlyIncentive": 5000,
  "giftVoucher": 1000,
  "month": "January",
  "year": 2025
}
```

---

### 6. Update Payroll Record
**Method:** `PUT`  
**URL:** `http://localhost:5000/api/payroll/:id`

**Example:** `PUT http://localhost:5000/api/payroll/EMP-001`

**Body (JSON):**
```json
{
  "monthlySalary": 260000,
  "monthlyIncentive": 40000
}
```

---

### 7. Delete Payroll Record
**Method:** `DELETE`  
**URL:** `http://localhost:5000/api/payroll/:id`

**Example:** `DELETE http://localhost:5000/api/payroll/EMP-001`

---

## Employees APIs

### 1. Get All Employees
**Method:** `GET`  
**URL:** `http://localhost:5000/api/employees`

---

### 2. Get Employee by ID
**Method:** `GET`  
**URL:** `http://localhost:5000/api/employees/:id`

**Example:** `GET http://localhost:5000/api/employees/EMP-001`

---

### 3. Create Employee
**Method:** `POST`  
**URL:** `http://localhost:5000/api/employees`

**Body (JSON):**
```json
{
  "employeeId": "EMP-011",
  "name": "John Doe",
  "email": "john.doe@pravarahealth.com",
  "phone": "+91 9876543210",
  "department": "IT",
  "position": "Developer"
}
```

---

## Expenses APIs

### 1. Get All Expenses
**Method:** `GET`  
**URL:** `http://localhost:5000/api/expenses`

---

### 2. Get Expense Summary
**Method:** `GET`  
**URL:** `http://localhost:5000/api/expenses/summary`

---

## Financial APIs

### 1. Get Financial Analytics
**Method:** `GET`  
**URL:** `http://localhost:5000/api/financial/analytics?year=2024`

**Query Parameters:**
- `year`: Year for analytics (default: 2024)

---

## Dashboard APIs

### 1. Get Dashboard Overview
**Method:** `GET`  
**URL:** `http://localhost:5000/api/dashboard/overview`

---

### 2. Get Hiring Dashboard
**Method:** `GET`  
**URL:** `http://localhost:5000/api/dashboard/hiring`

---

## Troubleshooting

### If you get "Failed to fetch":

1. **Check Backend is Running:**
   ```bash
   cd backend
   npm run dev
   ```
   You should see: `🚀 Server running on http://localhost:5000`

2. **Test Health Endpoint:**
   ```
   GET http://localhost:5000/api/health
   ```

3. **Test Database Connection:**
   ```
   GET http://localhost:5000/api/payroll/test
   ```
   Check if `database.status` is "connected"

4. **Check MongoDB Connection:**
   - Look for `✅ MongoDB Connected` in backend console
   - If you see `❌ MongoDB connection error`, check your `.env` file

5. **Check CORS:**
   - Backend CORS is configured for all origins
   - If still having issues, check browser console for CORS errors

### Common Issues:

- **Port 5000 already in use:** Change PORT in `.env` file
- **MongoDB not connected:** Check connection string in `backend/config/database.js`
- **No data returned:** Check if data exists in MongoDB using the `/test` endpoint

