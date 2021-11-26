import mongoose from 'mongoose';

const pictureOfRoomSchema = new mongoose.Schema({
    idKindOfRoom:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AmenitiesDetailsData'
    },
    picture:{
       type: [String],
    }
},{timestamps: true})

const pictureOfRoom = mongoose.model('pictureOfRoom',pictureOfRoomSchema);
export default pictureOfRoom;