import express from 'express';
const router = express.Router();
import * as authWebController from '../controller/auth.web.controller.js'


router.post('/login',authWebController.login);
router.get('/logout',authWebController.logout);
router.get('/profile',authWebController.listUser);
router.get('/profile/:email',authWebController.findOneProfile);
router.post('/profile/insert',authWebController.createEmployee);

export {router};