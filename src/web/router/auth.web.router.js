import express from 'express';
const router = express.Router();
import * as authWebController from '../controller/auth.web.controller.js'


router.post('/login',authWebController.login);
router.get('/page/:page',authWebController.list);
router.get('/logout',authWebController.logout);
router.get('/profileUser',authWebController.list);

export {router};