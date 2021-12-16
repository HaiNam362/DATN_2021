import orderRoomBookedModel from '../../orderRoomBooked/orderRoomBookedModel.js';
import _ from 'lodash';
import moment from 'moment';



export const listOderRoomBooked = async(req, res, next) => {
    try {
        let { keySearch } = req.query;
        let data;
        if (keySearch) {
            var options = {
                phone: keySearch
            }
            data = await orderRoomBookedModel.find(options);
            console.log(data, 1);
        } else {
            data = await orderRoomBookedModel.find()
        }
        res.render('home', { OderRoomBookedDB: data })
    } catch (error) {
        res.send(error.message)
    }
}