import Mongoose from "mongoose";

const amenitiesModel = Mongoose.Schema({
    idKindOfRoom: {
        type: String,
        required: true,
    },
    airConditioner: {
        type: Number,
        default: 0,
    },
    wifi: {
        type: Number,
        default: 0,
    },
    smartTV: {
        type: Number,
        default: 0,
    },
    bed: {
        type: Number,
        default: 0,
    },
    sofa: {
        type: Number,
        default: 0,
    },
    hairdryer: {
        type: Number,
        default: 0,
    },
    slippers: {
        type: Number,
        default: 0,
    },
    smoking: {
        type: Number,
        default: 0,
    },
    telephone: {
        type: Number,
        default: 0,
    },
    towel: {
        type: Number,
        default: 0,
    },
    view: {
        type: String,
        required: true,
    },
    waterboiler: {
        type: Number,
        default: 0,
    },
    waterfree: {
        type: Number,
        default: 0,
    },
    acreage: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,

        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },

})
export default Mongoose.model('AmenitiesDetailsData', amenitiesModel)