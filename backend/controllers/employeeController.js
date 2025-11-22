import asyncHandler from '../middleware/asyncHandler.js';
import Employee from '../models/Employee.js';

// @desc    Get all employees
// @route   GET /api/employees
// @access  Public
export const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find().sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: employees.length,
    data: employees
  });
});

// @desc    Get single employee by ID
// @route   GET /api/employees/:id
// @access  Public
export const getEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({ employeeId: req.params.id });
  
  if (!employee) {
    return res.status(404).json({
      success: false,
      error: 'Employee not found'
    });
  }

  res.status(200).json({
    success: true,
    data: employee
  });
});

// @desc    Create new employee
// @route   POST /api/employees
// @access  Public
export const createEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.create(req.body);
  
  res.status(201).json({
    success: true,
    data: employee
  });
});

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Public
export const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findOneAndUpdate(
    { employeeId: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!employee) {
    return res.status(404).json({
      success: false,
      error: 'Employee not found'
    });
  }

  res.status(200).json({
    success: true,
    data: employee
  });
});

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Public
export const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findOneAndDelete({ employeeId: req.params.id });

  if (!employee) {
    return res.status(404).json({
      success: false,
      error: 'Employee not found'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Employee deleted successfully',
    data: {}
  });
});

