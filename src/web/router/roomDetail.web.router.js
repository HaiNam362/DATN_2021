import express from 'express';
const router = express.Router();
import * as roomDetailController from '../controller/roomDetail.web.controller.js';


router.get('/table',roomDetailController.listRoomDetail);
router.post('/table/insert',roomDetailController.createRoomDetail);


export {router};