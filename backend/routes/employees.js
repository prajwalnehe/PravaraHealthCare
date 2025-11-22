import express from 'express';
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController.js';
import { validateEmployee } from '../middleware/validator.js';

const router = express.Router();

router.route('/')
  .get(getEmployees)
  .post(validateEmployee, createEmployee);

router.route('/:id')
  .get(getEmployee)
  .put(validateEmployee, updateEmployee)
  .delete(deleteEmployee);

export default router;

