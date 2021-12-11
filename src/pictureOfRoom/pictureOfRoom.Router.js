import express from 'express'
import * as pictureOfRoomController from './pictureOfRoom.Controller.js'
const Router = express.Router();
import multer from 'multer';
import { storage } from '../middleware/uploadAvatar.js'
const upload = multer({ storage: storage });
import { uploadPicture } from '../middleware/uploadPicture.js'

Router.put('/createPictureOfRoom', upload.single('picture'), pictureOfRoomController.createPictureOfRoom);
Router.post('/uploadPicture', uploadPicture, pictureOfRoomController.createPictureOfRoom);
Router.put('/updatePictureOfRoom',uploadPicture, pictureOfRoomController.updatePictureOfRoom);
Router.get('/getPictureOfRoom',pictureOfRoomController.getPictureAndPrice);
Router.get('/getPrice/:price',pictureOfRoomController.getPrice);

export { Router }