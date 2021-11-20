import Mongoose from "mongoose";

const orderRoomBookedModel = Mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },

    timeBookingStart: {
        type: String,
        required: true
    },
    timeBookingEnd: {
        type: String,
        required: true
    },
    advanceDeposit: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
    },
    bookingStatus: {
        type: Number,
        default: 0
    },
    totalRoomRate: {
        type: Number,
        required: true
    }
})
export default Mongoose.model('orderRoomBooked', orderRoomBookedModel)