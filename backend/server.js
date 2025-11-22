import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import appConfig from './config/app.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
import dashboardRoutes from './routes/dashboard.js';
import employeeRoutes from './routes/employees.js';
import payrollRoutes from './routes/payroll.js';
import expenseRoutes from './routes/expenses.js';
import financialRoutes from './routes/financial.js';

dotenv.config();

const app = express();
const PORT = appConfig.port;

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: appConfig.corsOrigin,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/financial', financialRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true,
    status: 'ok', 
    message: 'Pravara Health Clinic API is running' 
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    success: true,
    message: 'Pravara Health Clinic Backend API',
    version: '1.0.0',
    endpoints: {
      dashboard: '/api/dashboard',
      employees: '/api/employees',
      payroll: '/api/payroll',
      expenses: '/api/expenses',
      financial: '/api/financial'
    }
  });
});

// Error handling middleware (must be after routes)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🌍 Environment: ${appConfig.nodeEnv}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💾 MongoDB URI: ${appConfig.mongodbUri ? 'Configured' : 'Not set'}`);
});

// Handle server errors
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

