import express from 'express';
import {
  getPayrolls,
  getPayrollSummary,
  getTotalSalaries,
  createPayroll,
  updatePayroll,
  deletePayroll
} from '../controllers/payrollController.js';
import { validatePayroll } from '../middleware/validator.js';

const router = express.Router();

router.get('/summary', getPayrollSummary);
router.get('/total-salaries', getTotalSalaries);

// Test endpoint to check raw data and connection
router.get('/test', async (req, res) => {
  try {
    const Payroll = (await import('../models/Payroll.js')).default;
    const mongoose = (await import('mongoose')).default;
    
    const dbStatus = mongoose.connection.readyState;
    const dbStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    
    const count = await Payroll.countDocuments();
    const sample = await Payroll.findOne();
    
    res.json({
      success: true,
      database: {
        status: dbStates[dbStatus] || 'unknown',
        readyState: dbStatus,
        name: mongoose.connection.name,
        host: mongoose.connection.host
      },
      data: {
        count,
        sample: sample ? {
          employeeId: sample.employeeId,
          employeeName: sample.employeeName,
          monthlySalary: sample.monthlySalary,
          annualPackage: sample.annualPackage,
          fuelExpense: sample.fuelExpense,
          fuelExpenseType: typeof sample.fuelExpense,
          isFuelExpenseObject: typeof sample.fuelExpense === 'object',
          allFields: Object.keys(sample.toObject())
        } : null
      }
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

router.route('/')
  .get(getPayrolls)
  .post(validatePayroll, createPayroll);

router.route('/:id')
  .put(validatePayroll, updatePayroll)
  .delete(deletePayroll);

export default router;

