import express from 'express';
import {
  getExpenses,
  getExpenseSummary,
  createExpense,
  updateExpense,
  deleteExpense
} from '../controllers/expenseController.js';
import { validateExpense } from '../middleware/validator.js';

const router = express.Router();

router.get('/summary', getExpenseSummary);

router.route('/')
  .get(getExpenses)
  .post(validateExpense, createExpense);

router.route('/:id')
  .put(validateExpense, updateExpense)
  .delete(deleteExpense);

export default router;

