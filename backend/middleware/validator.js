// Validation middleware for request validation

export const validateEmployee = (req, res, next) => {
  const { employeeId, name, email } = req.body;

  if (!employeeId || !name || !email) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: employeeId, name, and email are required',
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format',
    });
  }

  next();
};

export const validatePayroll = (req, res, next) => {
  const { employeeId, employeeName, monthlySalary, annualPackage } = req.body;

  if (!employeeId || !employeeName || monthlySalary === undefined || annualPackage === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: employeeId, employeeName, monthlySalary, and annualPackage are required',
    });
  }

  if (monthlySalary < 0 || annualPackage < 0) {
    return res.status(400).json({
      success: false,
      error: 'Salary values must be non-negative',
    });
  }

  next();
};

export const validateExpense = (req, res, next) => {
  const { month, year, officeRent, utilities } = req.body;

  if (!month || !year || officeRent === undefined || utilities === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: month, year, officeRent, and utilities are required',
    });
  }

  if (officeRent < 0 || utilities < 0) {
    return res.status(400).json({
      success: false,
      error: 'Expense values must be non-negative',
    });
  }

  next();
};

export const validateFinancialData = (req, res, next) => {
  const { month, year, income, expense } = req.body;

  if (!month || !year || income === undefined || expense === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: month, year, income, and expense are required',
    });
  }

  if (income < 0 || expense < 0) {
    return res.status(400).json({
      success: false,
      error: 'Financial values must be non-negative',
    });
  }

  next();
};

