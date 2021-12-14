import express from 'express';
const router = express.Router();
import * as authWebController from '../controller/auth.web.controller.js'


<<<<<<< HEAD
router.post('/login', authWebController.login);
router.get('/logout', authWebController.logout);
router.get('/profile', authWebController.listUser);
router.get('/table', authWebController.listRoom);

export { router };
=======
router.post('/login',authWebController.login);
router.get('/logout',authWebController.logout);
router.get('/profile',authWebController.listUser);
router.get('/profile/:email',authWebController.findOneProfile);
// router.get('/profile/:email',authWebController.findOneProfile);
// router.post('/profileDetail/delete',authWebController.deleteProfile);

export {router};
>>>>>>> 2836123dbd5d31a76e74e8ddd06df06d4b3f2406
