# Pravara Health Clinic Backend API

Backend REST API for the Pravara Health Clinic Management System.

## Features

- Employee management
- Payroll management
- Expense tracking
- Financial analytics
- Dashboard data

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pravara-health-clinic
NODE_ENV=development
```

3. Make sure MongoDB is running on your system.

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Dashboard
- `GET /api/dashboard/overview` - Get dashboard overview data
- `GET /api/dashboard/hiring` - Get hiring dashboard data

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Payroll
- `GET /api/payroll` - Get all payroll records
- `GET /api/payroll/summary` - Get payroll summary
- `GET /api/payroll/total-salaries` - Get total salaries breakdown
- `POST /api/payroll` - Create payroll record
- `PUT /api/payroll/:id` - Update payroll record
- `DELETE /api/payroll/:id` - Delete payroll record

### Expenses
- `GET /api/expenses` - Get all expenses
- `GET /api/expenses/summary` - Get expense summary
- `POST /api/expenses` - Create expense record
- `PUT /api/expenses/:id` - Update expense record
- `DELETE /api/expenses/:id` - Delete expense record

### Financial Analytics
- `GET /api/financial/analytics` - Get financial analytics data
- `POST /api/financial` - Create financial data record
- `PUT /api/financial/:id` - Update financial data record

## Database Models

### Employee
- employeeId (String, unique)
- name (String)
- email (String, unique)
- phone (String)
- department (String)
- position (String)
- hireDate (Date)
- status (String: active, inactive, terminated)

### Payroll
- employeeId (String)
- employeeName (String)
- monthlySalary (Number)
- annualPackage (Number)
- mobileRecharge (Number)
- fuelExpense (Object: amount, vehicleNumber)
- monthlyIncentive (Number)
- giftVoucher (Number)
- month (String)
- year (Number)

### Expense
- month (String)
- year (Number)
- officeRent (Number)
- utilities (Number)
- other (Number)
- notes (String)

### FinancialData
- month (String)
- year (Number)
- income (Number)
- expense (Number)
- incomeBreakdown (Object)
- expenseBreakdown (Object)

## Connecting Frontend

Update your frontend API base URL to point to:
```
http://localhost:5000/api
```

## Notes

- The API uses CORS to allow requests from the frontend
- All monetary values are stored as numbers (in rupees)
- The API formats currency for display in responses
- MongoDB connection is optional - the server will continue even if MongoDB is not available (though data won't persist)

