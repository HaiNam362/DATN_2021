import Mongoose from "mongoose";

const orderRoomBookingDetailModel = Mongoose.Schema({
    idBooking: {
        type: String,
    },
    idRoom: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
})
export default Mongoose.model('orderRoomBookingDetailModel', orderRoomBookingDetailModel)