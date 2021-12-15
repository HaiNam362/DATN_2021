import express from 'express';
const router = express.Router();
import * as authWebController from '../controller/auth.web.controller.js'

// <<<<<<< HEAD
router.post('/login', authWebController.login);
router.get('/logout', authWebController.logout);
router.get('/profile', authWebController.listUser);
router.get('/customer', authWebController.listCustomers);
router.get('/profile/:email', authWebController.findOneProfile);
router.post('/profile/createUser', authWebController.createUser);
router.post('/profile/deleteUser', authWebController.DeleteUser);
router.get('/profile/:email', authWebController.findOneProfile);
//router.post('/profileDetail/delete',authWebController.deleteProfile);
// =======
//
// router.post('/login',authWebController.login);
// router.get('/logout',authWebController.logout);
// router.get('/profile',authWebController.listUser);
// router.get('/profile/:email',authWebController.findOneProfile);
// router.post('/profile/insert',authWebController.createEmployee);
// >>>>>>> server/nam

export { router };