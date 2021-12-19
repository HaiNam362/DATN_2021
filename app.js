import express from 'express';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import hbs from 'hbs'
import path from 'path';
import cookieParser from 'cookie-parser';
import { createRequire } from 'module';
const require = createRequire(
    import.meta.url);
import orderRoomBookedApi from './src/orderRoomBooked/orderRoomBookedApi.js';
import roomDetailAPI from "./src/roomDetail/roomDetailAPI.js";
import oderRoomBookingDetailApi from "./src/orderRoomBookingDetail/orderRoomBookingDatailApi.js";
// configs
import connectDatabase from "./src/configs/dbConfigs.js";

import amenitiesAPI from "./src/roomAmenities/amenitiesAPI.js";

// const authRouter = require('./src/auth/auth.Router')
import * as authRouter from './src/auth/auth.Router.js';
import * as pictureOfRoom from './src/pictureOfRoom/pictureOfRoom.Router.js'
// web
import * as authWebRouter from './src/web/router/auth.web.router.js'
import * as statisticalRouter from './src/web/router/statistical.web.router.js'
import * as roomDetailRouter from './src/web/router/roomDetail.web.router.js'
import * as customer from './src/web/router/cusromerRouter.js'
// test thống kê
import orderRoomBooked from './src/orderRoomBooked/orderRoomBookedModel.js'

//dotenv.config()
connectDatabase();
const app = express();
const __dirname = path.resolve();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')));

hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

hbs.registerHelper('newDate', (value) => {
    return value.toLocaleString();
});


app.get('/test', async(req, res, next) => {
    const total = await orderRoomBooked.aggregate(
        [{
            '$group': {
                '_id': null,
                'total': {
                    '$sum': '$totalRoomRate'
                }
            }
        }]
    )
    res.send(total);

})


app.get("/", async(req, res) => {
    res.render('login')
})



//Route api
app.use('/orderRoomBooked', orderRoomBookedApi)
app.use('/roomDetail', roomDetailAPI)

app.use('/roomAmenities', amenitiesAPI)
app.use('/api/v1/auth', authRouter.Router);
app.use('/api/v1/pictureOfRoom', pictureOfRoom.Router);
app.use('/oderRoomBookingDetail', oderRoomBookingDetailApi);
//Router web
app.use(cookieParser());
app.use('/', authWebRouter.router);
app.use('/', statisticalRouter.router);
app.use('/', roomDetailRouter.router);
app.use('/', customer.router)

//Server
app.listen(process.env.PORT || 7777, async() => {
    console.log(`Listening on PORT ${process.env.port}`);
})
export default app;