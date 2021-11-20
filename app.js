import express from 'express'
// import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(
    import.meta.url);
import orderRoomBookedApi from './src/orderRoomBooked/orderRoomBookedApi.js';
import roomDetailAPI from "./src/roomDetail/roomDetailAPI.js";
// configs
import connectDatabase from "./src/configs/dbConfigs.js";
import userAPI from "./src/user/userAPI.js";
import amenitiesAPI from "./src/roomAmenities/amenitiesAPI.js";
import oderRoomBookingDetailApi from "./src/oderRoomBookingDetail/oderRoomBookingDatailApi.js";
// const authRouter = require('./src/auth/auth.Router')
import * as authRouter from './src/auth/auth.Router.js';
//dotenv.config()
connectDatabase();
const app = express();
const __dirname = path.resolve();
app.use(express())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
//app.engine("hbs", exphbs({ defaultLayout: false }));



app.get("/home", async(req, res) => {
    res.render('index')
})
app.get("/login", async(req, res) => {
    res.render('login')
})
app.get("/register", async(req, res) => {
    res.render('register')
})
app.get("/profile", async(req, res) => {
    res.render('profile')
})
app.get("/table", async(req, res) => {
        res.render('table')
    })
    //Route
app.use('/orderRoomBooked', orderRoomBookedApi)
app.use('/roomDetail', roomDetailAPI)
app.use('/user', userAPI)
app.use('/roomAmenities', amenitiesAPI)
app.use('/api/v1/auth', authRouter.Router);
app.use('/oderRoomBookingDetail', oderRoomBookingDetailApi);
//Server
app.listen(process.env.PORT || 7777, async() => {
    console.log(`Server chạy bằng con port ${process.env.port}`);
})
export default app;