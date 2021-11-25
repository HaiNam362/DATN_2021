import pictureOfRoom from './pictureOfRoom.models.js';

export const createPictureOfRoom = async (req,res,next) => {
    try {
        let data =[];
        for (let i = 0; i < req.files.length; i++) {
            data.push(req.files[i].filename);
        }
        let userDB = await pictureOfRoom.create({picture: data},{returnOriginal: false});
        res.status(200).send({ 
            message: 'create pictureOfRoom successfully',
            data: userDB
        })
    } catch (error) {
        console.log(error);
    }
}
export const updatePictureOfRoom = async (req,res,next) => {
    try {
        const userID = req.user;
        let data = []; 
        for (let i = 0; i < req.files.length; i++) {
            data.push(req.files[i].filename);
        }
         await pictureOfRoom.updateOne({_id: userID},{picture: data},{returnOriginal: false});
        res.status(200).json({
            message: 'upload pictureOfRoom successfully',
            data: data
        })
    } catch (error) {
        console.log(error);
    }
}


