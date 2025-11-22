import asyncHandler from '../middleware/asyncHandler.js';
import Payroll from '../models/Payroll.js';

// @desc    Get all payroll records
// @route   GET /api/payroll
// @access  Public
export const getPayrolls = asyncHandler(async (req, res) => {
  try {
    const { month, year } = req.query;
    const query = {};
    
    if (month) query.month = month;
    if (year) query.year = parseInt(year);

    console.log('Fetching payroll records with query:', query);
    const payrolls = await Payroll.find(query).sort({ createdAt: -1 });
    
    // Log for debugging
    console.log(`✅ Found ${payrolls.length} payroll records`);
    if (payrolls.length > 0) {
      console.log('Sample payroll record structure:', {
        employeeId: payrolls[0].employeeId,
        employeeName: payrolls[0].employeeName,
        monthlySalary: payrolls[0].monthlySalary,
        fuelExpense: payrolls[0].fuelExpense,
        fuelExpenseType: typeof payrolls[0].fuelExpense
      });
    } else {
      console.log('⚠️  No payroll records found in database');
    }
  
  // Format for frontend
  const formattedPayrolls = payrolls.map(p => {
    try {
      // Handle fuelExpense - it might be an object or might not exist
      let fuelAmount = 0;
      let vehicleNumber = 'Company Shuttle';
      
      if (p.fuelExpense) {
        if (typeof p.fuelExpense === 'object' && p.fuelExpense.amount !== undefined) {
          fuelAmount = p.fuelExpense.amount || 0;
          vehicleNumber = p.fuelExpense.vehicleNumber || 'Company Shuttle';
        } else if (typeof p.fuelExpense === 'number') {
          fuelAmount = p.fuelExpense;
        }
      }
      
      const fuelExpenseStr = `₹${fuelAmount.toLocaleString('en-IN')} · ${vehicleNumber}`;
      
      return {
        id: p.employeeId || '',
        name: p.employeeName || '',
        monthlySalary: `₹${(p.monthlySalary || 0).toLocaleString('en-IN')}`,
        annualPackage: `₹${(p.annualPackage || 0).toLocaleString('en-IN')}`,
        mobileRecharge: `₹${(p.mobileRecharge || 0).toLocaleString('en-IN')}`,
        fuelExpense: fuelExpenseStr,
        monthlyIncentive: `₹${(p.monthlyIncentive || 0).toLocaleString('en-IN')}`,
        giftVoucher: `₹${(p.giftVoucher || 0).toLocaleString('en-IN')}`
      };
    } catch (error) {
      console.error('Error formatting payroll record:', error, p);
      // Return a safe default
      return {
        id: p.employeeId || '',
        name: p.employeeName || 'Unknown',
        monthlySalary: '₹0',
        annualPackage: '₹0',
        mobileRecharge: '₹0',
        fuelExpense: '₹0 · Company Shuttle',
        monthlyIncentive: '₹0',
        giftVoucher: '₹0'
      };
    }
  });

    res.status(200).json({
      success: true,
      count: formattedPayrolls.length,
      data: formattedPayrolls
    });
  } catch (error) {
    console.error('❌ Error in getPayrolls:', error);
    throw error; // Let asyncHandler catch it
  }
});

// @desc    Get payroll summary
// @route   GET /api/payroll/summary
// @access  Public
export const getPayrollSummary = asyncHandler(async (req, res) => {
  const payrolls = await Payroll.find();
  
  const totalMonthly = payrolls.reduce((sum, p) => sum + (p.monthlySalary || 0), 0);
  const totalAnnual = payrolls.reduce((sum, p) => sum + (p.annualPackage || 0), 0);
  const averageMonthly = Math.round(totalMonthly / (payrolls.length || 1));
  const highestMonthly = payrolls.length > 0 
    ? Math.max(...payrolls.map(p => p.monthlySalary || 0), 0)
    : 0;

  res.status(200).json({
    success: true,
    data: {
      totalMonthly,
      totalAnnual,
      averageMonthly,
      highestMonthly,
      employeeCount: payrolls.length
    }
  });
});

// @desc    Get total salaries breakdown
// @route   GET /api/payroll/total-salaries
// @access  Public
export const getTotalSalaries = asyncHandler(async (req, res) => {
  const payrolls = await Payroll.find();
  
  const totalMonthlySalary = payrolls.reduce((sum, p) => sum + (p.monthlySalary || 0), 0);
  const totalRecharge = payrolls.reduce((sum, p) => sum + (p.mobileRecharge || 0), 0);
  const totalIncentives = payrolls.reduce((sum, p) => sum + (p.monthlyIncentive || 0), 0);
  const totalVouchers = payrolls.reduce((sum, p) => sum + (p.giftVoucher || 0), 0);
  const totalFuel = payrolls.reduce((sum, p) => {
    const fuelAmount = p.fuelExpense?.amount || p.fuelExpense || 0;
    return sum + (typeof fuelAmount === 'number' ? fuelAmount : 0);
  }, 0);

  res.status(200).json({
    success: true,
    data: {
      totalMonthlySalary,
      totalRecharge,
      totalIncentives,
      totalVouchers,
      totalFuel,
      employeeCount: payrolls.length
    }
  });
});

// @desc    Create payroll record
// @route   POST /api/payroll
// @access  Public
export const createPayroll = asyncHandler(async (req, res) => {
  const payroll = await Payroll.create(req.body);
  
  res.status(201).json({
    success: true,
    data: payroll
  });
});

// @desc    Update payroll record
// @route   PUT /api/payroll/:id
// @access  Public
export const updatePayroll = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findOneAndUpdate(
    { employeeId: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!payroll) {
    return res.status(404).json({
      success: false,
      error: 'Payroll record not found'
    });
  }

  res.status(200).json({
    success: true,
    data: payroll
  });
});

// @desc    Delete payroll record
// @route   DELETE /api/payroll/:id
// @access  Public
export const deletePayroll = asyncHandler(async (req, res) => {
  const payroll = await Payroll.findOneAndDelete({ employeeId: req.params.id });

  if (!payroll) {
    return res.status(404).json({
      success: false,
      error: 'Payroll record not found'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Payroll record deleted successfully',
    data: {}
  });
});
