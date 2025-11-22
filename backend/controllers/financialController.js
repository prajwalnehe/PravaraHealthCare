import asyncHandler from '../middleware/asyncHandler.js';
import FinancialData from '../models/FinancialData.js';

// @desc    Get financial analytics data
// @route   GET /api/financial/analytics
// @access  Public
export const getFinancialAnalytics = asyncHandler(async (req, res) => {
  const { year = 2024 } = req.query;
  const financialData = await FinancialData.find({ year: parseInt(year) }).sort({ month: 1 });
  
  // Format monthly summary
  const monthlySummary = financialData.map(data => ({
    month: data.month.substring(0, 3), // Jan, Feb, etc.
    income: data.income,
    expense: data.expense
  }));

  // Calculate totals
  const totalIncome = financialData.reduce((sum, d) => sum + d.income, 0);
  const totalExpense = financialData.reduce((sum, d) => sum + d.expense, 0);
  const netIncome = totalIncome - totalExpense;

  // Income breakdown (aggregate from all months)
  const incomeBreakdown = financialData.reduce((acc, data) => {
    acc.salary += data.incomeBreakdown.salary || 0;
    acc.business += data.incomeBreakdown.business || 0;
    acc.investment += data.incomeBreakdown.investment || 0;
    return acc;
  }, { salary: 0, business: 0, investment: 0 });

  // Expense breakdown (aggregate from all months)
  const expenseBreakdown = financialData.reduce((acc, data) => {
    acc.housing += data.expenseBreakdown.housing || 0;
    acc.transportation += data.expenseBreakdown.transportation || 0;
    acc.entertainment += data.expenseBreakdown.entertainment || 0;
    acc.food += data.expenseBreakdown.food || 0;
    acc.other += data.expenseBreakdown.other || 0;
    return acc;
  }, { housing: 0, transportation: 0, entertainment: 0, food: 0, other: 0 });

  // Calculate expense percentages
  const totalExpenseBreakdown = Object.values(expenseBreakdown).reduce((sum, val) => sum + val, 0);
  const expensePercentages = {
    housing: totalExpenseBreakdown > 0 ? Math.round((expenseBreakdown.housing / totalExpenseBreakdown) * 100) : 0,
    transportation: totalExpenseBreakdown > 0 ? Math.round((expenseBreakdown.transportation / totalExpenseBreakdown) * 100) : 0,
    entertainment: totalExpenseBreakdown > 0 ? Math.round((expenseBreakdown.entertainment / totalExpenseBreakdown) * 100) : 0,
    food: totalExpenseBreakdown > 0 ? Math.round((expenseBreakdown.food / totalExpenseBreakdown) * 100) : 0,
    other: totalExpenseBreakdown > 0 ? Math.round((expenseBreakdown.other / totalExpenseBreakdown) * 100) : 0,
  };

  res.status(200).json({
    success: true,
    data: {
      monthlySummary,
      totalIncome,
      totalExpense,
      netIncome,
      incomeBreakdown: [
        { label: "Salary", value: incomeBreakdown.salary },
        { label: "Business", value: incomeBreakdown.business },
        { label: "Investment", value: incomeBreakdown.investment }
      ],
      expenseBreakdown: [
        { name: "Housing", value: expensePercentages.housing, color: "#A020F0" },
        { name: "Transportation", value: expensePercentages.transportation, color: "#D400FF" },
        { name: "Entertainment", value: expensePercentages.entertainment, color: "#FF00CC" },
        { name: "Food", value: expensePercentages.food, color: "#A020F0" },
        { name: "Other", value: expensePercentages.other, color: "#D400FF" }
      ]
    }
  });
});

// @desc    Create financial data record
// @route   POST /api/financial
// @access  Public
export const createFinancialData = asyncHandler(async (req, res) => {
  const financialData = await FinancialData.create(req.body);
  
  res.status(201).json({
    success: true,
    data: financialData
  });
});

// @desc    Update financial data record
// @route   PUT /api/financial/:id
// @access  Public
export const updateFinancialData = asyncHandler(async (req, res) => {
  const financialData = await FinancialData.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!financialData) {
    return res.status(404).json({
      success: false,
      error: 'Financial data record not found'
    });
  }

  res.status(200).json({
    success: true,
    data: financialData
  });
});

