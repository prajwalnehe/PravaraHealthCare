# Frontend-Backend Integration Guide

This guide explains how to connect your React frontend to the Node.js backend.

## Step 1: Configure API URL

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Or update `frontend/src/utils/api.js` to change the default API URL.

## Step 2: Install Dependencies (if needed)

The frontend should already have `fetch` available (built into modern browsers). No additional packages needed.

## Step 3: Update Frontend Components

### Example: Updating Payroll Component

Replace hardcoded data with API calls:

```jsx
import { useState, useEffect } from 'react';
import { payrollAPI } from '../utils/api';

export default function Payroll() {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPayroll() {
      try {
        const data = await payrollAPI.getAll();
        setPayrollData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPayroll();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Rest of your component using payrollData
}
```

### Example: Updating Expenses Component

```jsx
import { useState, useEffect } from 'react';
import { expensesAPI } from '../utils/api';

export default function OtherExpenses() {
  const [expenseData, setExpenseData] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [expenses, summaryData] = await Promise.all([
          expensesAPI.getAll(),
          expensesAPI.getSummary()
        ]);
        setExpenseData(expenses);
        setSummary(summaryData);
      } catch (err) {
        console.error('Error fetching expenses:', err);
      }
    }
    fetchData();
  }, []);

  // Use expenseData and summary in your component
}
```

## Step 4: Start Both Servers

1. **Start Backend** (in `backend` directory):
   ```bash
   npm run dev
   ```

2. **Start Frontend** (in `frontend` directory):
   ```bash
   npm run dev
   ```

## Step 5: Test the Integration

1. Open browser console
2. Check Network tab for API calls
3. Verify data is loading from backend

## API Endpoints Reference

### Dashboard
- `GET /api/dashboard/overview` - Dashboard overview data
- `GET /api/dashboard/hiring` - Hiring dashboard data

### Employees
- `GET /api/employees` - All employees
- `GET /api/employees/:id` - Single employee
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Payroll
- `GET /api/payroll` - All payroll records
- `GET /api/payroll/summary` - Payroll summary
- `GET /api/payroll/total-salaries` - Total salaries breakdown

### Expenses
- `GET /api/expenses` - All expenses
- `GET /api/expenses/summary` - Expense summary

### Financial Analytics
- `GET /api/financial/analytics?year=2024` - Financial data

## Troubleshooting

### CORS Errors
- Make sure backend CORS is enabled (already configured)
- Check that backend is running on the correct port

### 404 Errors
- Verify API URL in frontend `.env` file
- Check backend routes are correct
- Ensure backend server is running

### Data Not Loading
- Check browser console for errors
- Verify MongoDB is running and seeded
- Test API endpoints directly in browser/Postman

### Connection Refused
- Ensure backend is running on port 5000
- Check firewall settings
- Verify `VITE_API_URL` matches backend URL

