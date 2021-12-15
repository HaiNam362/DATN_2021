import express from 'express';
const router = express.Router();
import * as customer from '../controller/customer.js';
router.get('/customer', customer.listCustomers);
router.post('/customer/delete', customer.DeleteCustomer);


export { router };