import mongoose from 'mongoose';

const financialDataSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  income: {
    type: Number,
    required: true,
    default: 0
  },
  expense: {
    type: Number,
    required: true,
    default: 0
  },
  incomeBreakdown: {
    salary: { type: Number, default: 0 },
    business: { type: Number, default: 0 },
    investment: { type: Number, default: 0 }
  },
  expenseBreakdown: {
    housing: { type: Number, default: 0 },
    transportation: { type: Number, default: 0 },
    entertainment: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

export default mongoose.model('FinancialData', financialDataSchema);

