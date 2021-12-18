import express from 'express';
const router = express.Router();
import * as authWebController from '../controller/auth.web.controller.js'
import { checkCookie } from '../../middleware/auth.js'

router.post('/login', authWebController.login);
router.get('/logout', authWebController.logout);
router.use(checkCookie);
router.get('/profile', authWebController.listUser);


router.get('/profile/:email', authWebController.findOneProfile);
router.post('/profile/createUser', authWebController.createUser);
router.post('/profile/deleteUser', authWebController.DeleteUser);
// router.get('/profile/:email', authWebController.findOneProfile);
// profileDetail
router.get('/profileDetail/:email', authWebController.listUserDetail);
router.post('/profileDetail/delete', authWebController.deleteUserDetail);


export { router };