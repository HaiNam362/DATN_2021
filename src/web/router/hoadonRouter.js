import express from 'express';
const router = express.Router();
import * as hoadon from '../controller/hoadon.js';
router.get('/hoadon', hoadon.listOderRoomBooked);



export { router };