import User from "../../auth/user.models.js";
import _ from "lodash";
import moment from "moment";
import orderRoomBookedModel from "../../orderRoomBooked/orderRoomBookedModel.js";
import roomDetailModel from "../../roomDetail/roomDetailModel.js";

export const statistical = async(req, res, next) => {
    try {
        var date = req?.query?.date;
        var status = req?.query?.status;
        var month = req?.query?.month;
        var year = req?.query?.years;
        status = _.isEmpty(status) ? 3 : status;
        let totalUserEmployee = await User.countDocuments({ role: "employee" });
        let totalUserDataEntry = await User.countDocuments({ role: "dataEntry" });
        let totalUserCustomer = await User.countDocuments({ role: "customer" });
        let totalRoomRate1 = await orderRoomBookedModel.find({
            bookingStatus: '3',
        });
        let totalRoomRate4 = await orderRoomBookedModel.find({
            bookingStatus: "3",
        });
        let totalRoomRate = totalRoomRate1;

        if (!_.isEmpty(date)) {
            totalRoomRate = totalRoomRate1.filter(
                (val) =>
                moment(date).format("DD/MM/YYYY") ===
                moment(val.updatedAt).format("DD/MM/YYYY")
            );
        }
        if (!_.isEmpty(month)) {
            totalRoomRate = totalRoomRate1.filter(
                (val) =>
                moment(month).format("MM/YYYY") ===
                moment(val.updatedAt).format("MM/YYYY")
            );
        }
        if (!_.isEmpty(year)) {
            totalRoomRate = totalRoomRate1.filter(
                (val) =>
                moment(year).format("YYYY") ===
                moment(val.updatedAt).format("YYYY")
            );
        }
        console.log(totalRoomRate4)













        // cho nay a a
        let totalBooked3 = await orderRoomBookedModel.countDocuments({
            bookingStatus: "3",
        });
        let totalBooked0 = await orderRoomBookedModel.countDocuments({
            bookingStatus: "0",
        });
        let totalBooked1 = await orderRoomBookedModel.countDocuments({
            bookingStatus: "1",
        });
        let totalBooked2 = await orderRoomBookedModel.countDocuments({
            bookingStatus: "2",
        });
        let totalRoom0 = await roomDetailModel.countDocuments({ roomStatus: "0" });
        let totalRoom1 = await roomDetailModel.countDocuments({ roomStatus: "1" });
        let totalRoom2 = await roomDetailModel.countDocuments({ roomStatus: "2" });
        const totalRoom = totalRoom0 + totalRoom1 + totalRoom2;
        const employee = totalUserEmployee + totalUserDataEntry;
        const totalBooked = totalBooked0 + totalBooked1 + totalBooked2 + totalBooked3;
        //   for (const val of totalRoomRate) {
        //     if (moment('2021-12-17').format('DD/MM/YYYY') === moment(val.createdAt).format('DD/MM/YYYY'))
        //     console.log(moment(val.createdAt).format('DD/MM/YYYY'))
        //    }
        //   const objSearch = _.isEmpty(date)?{} : moment(date).format('DD/MM/YYYY')
        let _number = 0;


        let _number2 = 0;


        totalRoomRate.forEach((item) => (_number += item.totalRoomRate));

        let orderRoomBookedDB = await orderRoomBookedModel.find({
            bookingStatus: status.toString(),
        });
        totalRoomRate4.forEach((item) => (_number2 += item.totalRoomRate));
        console.log("total: ", _number2);
        //      for (const val of orderRoomBookedDB1) {

        //          if (moment(date).format('DD/MM/YYYY') === moment(val.createdAt).format('DD/MM/YYYY')) {
        //              orderRoomBookedDB.push(val);
        //          } 

        //   }

        console.log(totalUserEmployee);
        console.log(totalUserCustomer);

        res.render("index", {
            employee,
            totalUserCustomer,
            totalUserEmployee,
            totalBooked,
            totalBooked3,
            totalBooked0,
            totalBooked1,
            totalBooked2,
            totalRoom0,
            totalRoom1,
            totalRoom2,
            totalRoom,
            totalUserDataEntry,
            _number,
            orderRoomBookedDB,
            date,
            _number2,
            month,
            year
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};