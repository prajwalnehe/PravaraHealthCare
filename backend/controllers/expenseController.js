import asyncHandler from '../middleware/asyncHandler.js';
import Expense from '../models/Expense.js';

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Public
export const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find().sort({ year: -1, month: -1 });
  
  // Format for frontend
  const formattedExpenses = expenses.map(e => ({
    month: e.month,
    officeRent: `₹${e.officeRent.toLocaleString('en-IN')}`,
    utilities: `₹${e.utilities.toLocaleString('en-IN')}`,
    other: `₹${e.other.toLocaleString('en-IN')}`,
    notes: e.notes
  }));

  res.status(200).json({
    success: true,
    count: formattedExpenses.length,
    data: formattedExpenses
  });
});

// @desc    Get expense summary
// @route   GET /api/expenses/summary
// @access  Public
export const getExpenseSummary = asyncHandler(async (req, res) => {
  const expenses = await Expense.find();
  
  const totalOfficeRent = expenses.reduce((sum, e) => sum + e.officeRent, 0);
  const totalUtilities = expenses.reduce((sum, e) => sum + e.utilities, 0);
  const totalOther = expenses.reduce((sum, e) => sum + e.other, 0);
  const totalExpenses = totalOfficeRent + totalUtilities + totalOther;
  const averageMonthly = Math.round(totalExpenses / (expenses.length || 1));

  res.status(200).json({
    success: true,
    data: {
      totalOfficeRent,
      totalUtilities,
      totalOther,
      totalExpenses,
      averageMonthly,
      monthCount: expenses.length
    }
  });
});

// @desc    Create expense record
// @route   POST /api/expenses
// @access  Public
export const createExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.create(req.body);
  
  res.status(201).json({
    success: true,
    data: expense
  });
});

// @desc    Update expense record
// @route   PUT /api/expenses/:id
// @access  Public
export const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!expense) {
    return res.status(404).json({
      success: false,
      error: 'Expense record not found'
    });
  }

  res.status(200).json({
    success: true,
    data: expense
  });
});

// @desc    Delete expense record
// @route   DELETE /api/expenses/:id
// @access  Public
export const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findByIdAndDelete(req.params.id);

  if (!expense) {
    return res.status(404).json({
      success: false,
      error: 'Expense record not found'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Expense record deleted successfully',
    data: {}
  });
});

