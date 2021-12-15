import express from 'express';
import bodyParser from 'body-parser';
// const bodyParser = new bodyParser()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import hbs from 'hbs'
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(
    import.meta.url);
import orderRoomBookedApi from './src/orderRoomBooked/orderRoomBookedApi.js';
import roomDetailAPI from "./src/roomDetail/roomDetailAPI.js";
import oderRoomBookingDetailApi from "./src/orderRoomBookingDetail/orderRoomBookingDatailApi.js";
// configs
import connectDatabase from "./src/configs/dbConfigs.js";
import userAPI from "./src/user/userAPI.js";
import amenitiesAPI from "./src/roomAmenities/amenitiesAPI.js";

// const authRouter = require('./src/auth/auth.Router')
import * as authRouter from './src/auth/auth.Router.js';
import * as pictureOfRoom from './src/pictureOfRoom/pictureOfRoom.Router.js'
// web
import * as authWebRouter from './src/web/router/auth.web.router.js'
import * as statisticalRouter from './src/web/router/statistical.web.router.js'
import * as roomDetailRouter from './src/web/router/roomDetail.web.router.js'
//dotenv.config()
connectDatabase();
const app = express();
const __dirname = path.resolve();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

hbs.registerHelper('newDate', (value) => {
    return value.toLocaleString();
  });



// app.set('views', path.join(__dirname, 'views'));

app.get("/", async(req, res) => {
    res.render('login')
})

app.get("/login", async(req, res) => {
        res.render('login')
    })
    // app.get("/home", async(req, res) => {
    //     res.render('index')
    // })
app.get("/customer", async(req, res, next) => {
    res.render('customer')
})
app.get("/register", async(req, res) => {
    res.render('register')
})
app.get("/table", async(req, res) => {
        res.render('table')
    })
    //Route api
app.use('/orderRoomBooked', orderRoomBookedApi)
app.use('/roomDetail', roomDetailAPI)
app.use('/user', userAPI)
app.use('/roomAmenities', amenitiesAPI)
app.use('/api/v1/auth', authRouter.Router);
app.use('/api/v1/pictureOfRoom', pictureOfRoom.Router);
app.use('/oderRoomBookingDetail', oderRoomBookingDetailApi);
//Router web
app.use('/',authWebRouter.router);
app.use('/',statisticalRouter.router);
app.use('/',roomDetailRouter.router);

//Server
app.listen(process.env.PORT || 7777, async() => {
    console.log(`Listening on PORT ${process.env.port}`);
})
export default app;
