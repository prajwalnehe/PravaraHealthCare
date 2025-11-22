import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    ref: 'Employee'
  },
  employeeName: {
    type: String,
    required: true
  },
  monthlySalary: {
    type: Number,
    required: true
  },
  annualPackage: {
    type: Number,
    required: true
  },
  mobileRecharge: {
    type: Number,
    default: 0
  },
  fuelExpense: {
    amount: {
      type: Number,
      default: 0
    },
    vehicleNumber: String
  },
  monthlyIncentive: {
    type: Number,
    default: 0
  },
  giftVoucher: {
    type: Number,
    default: 0
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Payroll', payrollSchema);

