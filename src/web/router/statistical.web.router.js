import express from 'express';
const router = express.Router();
import * as statisticalController from '../controller/statistical.web.controller.js'

router.get('/home',statisticalController.statistical);

export {router};