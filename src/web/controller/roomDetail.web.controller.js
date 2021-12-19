import roomDetailModel from '../../roomDetail/roomDetailModel.js'
import _ from 'lodash';
import moment from 'moment';



export const listRoomDetail = async(req, res, next) => {
    try {
        let { keySearch } = req.query;
        let data;
        if (keySearch) {
            var options = {
                idRoom: keySearch
            }
            data = await roomDetailModel.find(options);
            console.log(data, 1);
        } else {
            data = await roomDetailModel.find()
        }
        res.render('table', { roomDetailDB: data })

    } catch (error) {
        res.send(error.message)
    }
}
export const createRoomDetail = async(req, res, next) => {
    try {
        let { idRoom, roomName, maximumNumberOfPeople, roomStatus, idKindOfRoom, roomPrice } = req.body;
        console.log(req.body);
        let payload = {
            idRoom,
            roomName,
            maximumNumberOfPeople,
            roomStatus,
            idKindOfRoom,
            roomPrice,
        }
        await roomDetailModel.create(payload);
        res.redirect('/table')
    } catch (error) {
        res.send(error.message)
    }
}
export const updateRoomDetail = async(req, res, next) => {
    try {
        let { _id, idRoom, roomName, maximumNumberOfPeople, roomStatus, idKindOfRoom, roomPrice, updatedAt } = req.body;
        console.log(req.body);
        console.log("abc");

        let roomDetail = await roomDetailModel.findById(_id);

        console.log(roomDetail);

        if (!roomDetail) {
            return res.send("Not Found");
        }
        let payload = {
            idRoom,
            roomName,
            maximumNumberOfPeople,
            roomStatus,
            idKindOfRoom,
            roomPrice,
            updatedAt: Date.now(),
        }
        await roomDetailModel.updateOne({ _id }, payload);
        res.redirect("/table");
    } catch (error) {
        res.send(error.message)
    }
}
export const deleteRoomDetail = async(req, res, next) => {
    try {
        await roomDetailModel.findByIdAndDelete(req.body._id);
        res.redirect('/table');

    } catch (error) {
        res.status(500).send(error);
    }
}
export const findOneTableDetail = async(req, res) => {
    try {
        const { idRoom } = req.params;
        let data = await roomDetailModel.findOne({ idRoom });

        if (!data) {
            return res.sendStatus(404)
        }
        res.render('tableDetail', { roomDetailDB: data });
    } catch (error) {
        res.send(error.message);
    }
}