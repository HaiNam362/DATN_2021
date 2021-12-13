import pictureOfRoom from './pictureOfRoom.models.js';
let pictureURL = 'https://datphongkhachsan.herokuapp.com/public/upload/'
// let pictureURL = 'http://localhost:7777/public/upload/'

export const createPictureOfRoom = async (req, res, next) => {
    try {
        let data = [];
        for (let i = 0; i < req.files.length; i++) {
            data.push(pictureURL + req.files[i].filename);
        }
        let pictureDB = await pictureOfRoom.create({ ...req.body, picture: data});
        res.status(200).send({
            message: 'create pictureOfRoom successfully',
            data: pictureDB
        })
    } catch (error) {
        console.log(error);
    }
}
export const updatePictureOfRoom = async (req, res, next) => {
    try {
        const { _id, price } = req.body;
        let pictureDB = await pictureOfRoom.findOne({ _id: _id });
        let picture = pictureDB.picture;
        picture.splice(0, 6);
        if (req.files.length < 2) {
            return res.status(400).send({ message: 'cần ít nhất 2 ảnh' });
        }
        for (let i = 0; i < req.files.length; i++) {
            picture.push(pictureURL + req.files[i].filename);
        }
        let data = { price, picture };
        await pictureOfRoom.updateOne({ _id }, data);
        return res.status(200).json({
            message: 'update ảnh phòng thành công',
            data: data,
        })
    } catch (error) {
        console.log(error);
    }
}

export const getPictureAndPrice = async (req, res) => {
    try {
        const picture = await pictureOfRoom.find({});
        return res.status(200).json({
            status: 'get price',
            result: picture.length,
            data: { picture }
        })
    } catch (error) {
        console.log(error);
    }
}
export const getPrice = async (req, res, next) => {
    const Price = req.params.price;
    console.log(Price,"123");
    try {
        if(Price.length < 1) {
            return res.status(404).send({message: 'price cannot be empty'});
        }
        const priceDB = await pictureOfRoom.findOne({ price: Price });
        if(!priceDB){
            return res.status(400).send("price not found");
        }
        return res.status(200).json({
            status: 'get price',
            data: priceDB
        })
    } catch (error) {
        console.log(error);
    }
}


