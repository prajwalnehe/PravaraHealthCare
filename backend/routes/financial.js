import express from 'express';
import {
  getFinancialAnalytics,
  createFinancialData,
  updateFinancialData
} from '../controllers/financialController.js';
import { validateFinancialData } from '../middleware/validator.js';

const router = express.Router();

router.get('/analytics', getFinancialAnalytics);

router.route('/')
  .post(validateFinancialData, createFinancialData);

router.route('/:id')
  .put(validateFinancialData, updateFinancialData);

export default router;

