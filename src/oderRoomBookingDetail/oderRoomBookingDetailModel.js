import Mongoose from "mongoose";

const orderRoomBookingDetailModel = Mongoose.Schema({
    idBookingDetails: {
        type: String,
        required: true
    },
    idRoom: {
        type: String,

    },
    totalPaymentDetails: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
})
export default Mongoose.model('orderRoomBookingDetailModel', orderRoomBookingDetailModel)