import Mongoose from "mongoose";

const amenitiesModel = Mongoose.Schema({
    idKindOfRoom: {
        type: String,
        required: true,
    },
    airConditioner: {
        type: Number,
        default:0,
    },
    wifi: {
        type: Number,
        default:0,
    },
    smartTV: {
        type: Number,
        default:0,
    },
    bed: {
        type: Number,
        default:0,
    },
    sofa: {
        type: Number,
        default:0,
    },
    created_at    : {
        type: Date,

        default: Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },

})
export default Mongoose.model('AmenitiesDetailsData', amenitiesModel)