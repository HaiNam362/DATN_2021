import mongoose from 'mongoose';

const pictureOfRoomSchema = new mongoose.Schema({
    price:{
        type: Number,
        require: [true, 'price must be require']
    },
    picture:{
       type: [String],
    }
},{timestamps: true})

const pictureOfRoom = mongoose.model('pictureOfRoom',pictureOfRoomSchema);
export default pictureOfRoom;