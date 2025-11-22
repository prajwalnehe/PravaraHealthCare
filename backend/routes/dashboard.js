import express from 'express';
import {
  getDashboardOverview,
  getHiringDashboard
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/overview', getDashboardOverview);
router.get('/hiring', getHiringDashboard);

export default router;

