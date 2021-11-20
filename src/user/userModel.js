import Mongoose from "mongoose";

const userModel = Mongoose.Schema({
    fullName: {
        type: String,

    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    userName: {
        type: String,
        required:[true,'username is required']
    },
    password: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    address: {
        type: String,
    },
    status:{
        type:String,
    },
    avatarURL: {
        type: String,
    },
    created_at    : {
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type:Date,
default: Date.now()
     },
})
export default Mongoose.model('user', userModel)