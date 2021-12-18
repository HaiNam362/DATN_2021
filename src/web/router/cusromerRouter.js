import express from 'express';
const router = express.Router();
import * as customer from '../controller/customer.js';

router.get('/customer', customer.listCustomers);
router.get('/custommerDetail/:email', customer.listCustomersDetail);
router.post('/customer/delete', customer.DeleteCustomer);
router.get('/customer/:email', customer.findOneCustomer);


export { router };