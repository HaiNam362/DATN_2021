import express from 'express'
import * as  authController from './auth.Controller.js'
const Router = express.Router();
import multer from 'multer';
import {storage } from '../middleware/uploadAvatar.js'
const upload = multer({storage: storage});

import {verifyToken} from '../middleware/auth.js'
import {checkRole} from '../middleware/auth.js'


Router.post('/register',authController.register);
Router.post('/login',authController.login);
// verifyToken
Router.use(verifyToken)
Router.get('/getUser/:id',authController.getListUserId);
Router.get('/getUser',checkRole("admin"),authController.getListUser);
Router.put('/updateUser/:id',authController.UpdateOneUser);
Router.delete('/deleteUser/:id',authController.DelateOneUser);
Router.put('/uploadAvatar',upload.single('avatar'),authController.uploadAvatar);
Router.post('/createEmployeeAccount',checkRole("admin"), authController.createEmployeeAccount);
Router.get('/getEmployees',checkRole("admin"),authController.getEmployees);

export {Router};