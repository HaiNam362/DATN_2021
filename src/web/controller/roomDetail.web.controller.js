import roomDetailModel from '../../roomDetail/roomDetailModel.js'
import _ from 'lodash';
import moment from 'moment';



export const listRoomDetail = async (req, res, next) => {
    try {
        let { keySearch } = req.query;
        let data;
        if (keySearch) {
            var options = {
                idRoom:  keySearch  
            }
            data = await roomDetailModel.find(options);
            console.log(data, 1);
        } else {
            data = await roomDetailModel.find()
        }
        res.render('table',{roomDetailDB: data})
    } catch (error) {
        res.send(error.message)
    }
}
export const createRoomDetail = async (req, res, next) => {
    try {
        let {idRoom,roomName,maximumNumberOfPeople,roomStatus,idKindOfRoom,roomPrice} = req.body;
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
export const updateRoomDetail = async (req, res, next) => {
    try {

    } catch (error) {
        res.send(error.message)
    }
}
export const deleteRoomDetail = async (req, res, next) => {
    try {

    } catch (error) {
        res.send(error.message)
    }
}