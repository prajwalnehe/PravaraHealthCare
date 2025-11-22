# Backend Architecture

This document explains the refactored backend architecture with middleware, config, and controllers.

## Project Structure

```
backend/
├── config/              # Configuration files
│   ├── database.js      # MongoDB connection
│   └── app.js           # App configuration
│
├── controllers/         # Business logic (MVC pattern)
│   ├── dashboardController.js
│   ├── employeeController.js
│   ├── payrollController.js
│   ├── expenseController.js
│   └── financialController.js
│
├── middleware/          # Request/response middleware
│   ├── asyncHandler.js  # Async error wrapper
│   ├── errorHandler.js # Global error handler
│   ├── logger.js       # Request logging
│   ├── notFound.js     # 404 handler
│   └── validator.js    # Request validation
│
├── models/             # MongoDB models
│   ├── Employee.js
│   ├── Payroll.js
│   ├── Expense.js
│   └── FinancialData.js
│
├── routes/             # API routes (thin layer)
│   ├── dashboard.js
│   ├── employees.js
│   ├── payroll.js
│   ├── expenses.js
│   └── financial.js
│
└── server.js           # Express app entry point
```

## Architecture Pattern: MVC (Model-View-Controller)

### Models
- Define database schemas using Mongoose
- Located in `models/` directory
- Handle data structure and validation

### Views
- In this API, "views" are JSON responses
- Controllers format the response data

### Controllers
- Contain business logic
- Handle request/response
- Located in `controllers/` directory
- Use `asyncHandler` wrapper for error handling

### Routes
- Define API endpoints
- Map URLs to controller functions
- Apply middleware (validation, etc.)
- Thin layer - no business logic

## Middleware

### asyncHandler
Wraps async route handlers to automatically catch errors and pass them to error handler.

```javascript
// Before
router.get('/', async (req, res) => {
  try {
    // code
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// After
router.get('/', asyncHandler(async (req, res) => {
  // code - errors automatically caught
}));
```

### errorHandler
Global error handling middleware that:
- Catches all errors
- Formats error responses
- Handles Mongoose errors (CastError, ValidationError, duplicate keys)
- Shows stack trace in development

### logger
Logs all incoming requests with:
- HTTP method
- URL
- Status code
- Response time
- IP address

### validator
Request validation middleware:
- `validateEmployee` - Validates employee data
- `validatePayroll` - Validates payroll data
- `validateExpense` - Validates expense data
- `validateFinancialData` - Validates financial data

### notFound
Handles 404 errors for undefined routes.

## Configuration

### config/database.js
- Handles MongoDB connection
- Exports `connectDB()` function
- Gracefully handles connection failures

### config/app.js
- Centralized app configuration
- Reads from environment variables
- Exports config object

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "count": 10  // Optional, for list responses
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## Benefits of This Architecture

1. **Separation of Concerns**
   - Routes handle routing
   - Controllers handle business logic
   - Models handle data

2. **Reusability**
   - Controllers can be reused
   - Middleware is reusable across routes

3. **Maintainability**
   - Easy to find and modify code
   - Clear structure

4. **Error Handling**
   - Centralized error handling
   - Consistent error responses

5. **Validation**
   - Reusable validation middleware
   - Consistent validation logic

6. **Logging**
   - Automatic request logging
   - Easy debugging

## Adding New Features

### 1. Add a New Model
```javascript
// models/NewModel.js
import mongoose from 'mongoose';
const schema = new mongoose.Schema({ ... });
export default mongoose.model('NewModel', schema);
```

### 2. Add a New Controller
```javascript
// controllers/newController.js
import asyncHandler from '../middleware/asyncHandler.js';
import NewModel from '../models/NewModel.js';

export const getItems = asyncHandler(async (req, res) => {
  const items = await NewModel.find();
  res.status(200).json({ success: true, data: items });
});
```

### 3. Add a New Route
```javascript
// routes/new.js
import express from 'express';
import { getItems } from '../controllers/newController.js';
const router = express.Router();
router.get('/', getItems);
export default router;
```

### 4. Register Route in server.js
```javascript
import newRoutes from './routes/new.js';
app.use('/api/new', newRoutes);
```

## Best Practices

1. **Always use asyncHandler** for async controllers
2. **Use validation middleware** before controllers
3. **Return consistent response format**
4. **Handle errors in controllers** or let errorHandler catch them
5. **Keep routes thin** - only routing logic
6. **Keep controllers focused** - one responsibility per function

