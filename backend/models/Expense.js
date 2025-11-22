import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  officeRent: {
    type: Number,
    required: true,
    default: 0
  },
  utilities: {
    type: Number,
    required: true,
    default: 0
  },
  other: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('Expense', expenseSchema);

