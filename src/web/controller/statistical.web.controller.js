import User from '../../auth/user.models.js'
import _ from 'lodash';
import moment from 'moment'
import orderRoomBookedModel from '../../orderRoomBooked/orderRoomBookedModel.js';
import roomDetailModel from '../../roomDetail/roomDetailModel.js';

export const statistical = async(req, res, next) => {
    try {
        let totalUserEmployee = await User.countDocuments({ role: 'employee' });
        let totalUserDataEntry = await User.countDocuments({ role: 'dataEntry' });
        let totalUserCustomer = await User.countDocuments({ role: 'customer' });
        let totalRoomRate = await orderRoomBookedModel.find() // cho nay a a
        let totalBooked3 = await orderRoomBookedModel.countDocuments({ bookingStatus: '3' })
        let totalBooked0 = await orderRoomBookedModel.countDocuments({ bookingStatus: '0' })
        let totalBooked1 = await orderRoomBookedModel.countDocuments({ bookingStatus: '1' })
        let totalRoom0 = await roomDetailModel.countDocuments({ roomStatus: "0" })
        let totalRoom1 = await roomDetailModel.countDocuments({ roomStatus: "1" })
        let totalRoom2 = await roomDetailModel.countDocuments({ roomStatus: "2" })
        const totalRoom = totalRoom0 + totalRoom1 + totalRoom2;
        const employee = totalUserEmployee + totalUserDataEntry;
        console.log("data: ", totalRoomRate) // de em cong xem dung k :)) dung roi anh a 
        let _number = 0;
        totalRoomRate.forEach(item => _number += item.totalRoomRate);
        console.log("total: ", _number)
        let orderRoomBookedDB = await orderRoomBookedModel.find({});
        console.log(totalUserEmployee);
        console.log(totalUserCustomer);

        res.render('index', {
            employee,
            totalUserCustomer,
            totalUserEmployee,
            totalBooked3,
            totalBooked0,
            totalBooked1,
            totalRoom0,
            totalRoom1,
            totalRoom2,
            totalRoom,
            totalUserDataEntry,
            _number,
            orderRoomBookedDB,
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}