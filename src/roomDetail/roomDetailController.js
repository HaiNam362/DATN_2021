import roomDetailData from "./roomDetailData.js";
const data = new roomDetailData
class roomDetailController {
    async create(obj) {
        const doc = await data.create(obj)
        return doc
    }
    async findAll(page) {
        const read = await data.findAll()
        const itemPerPage = 50;
        const slice = read.slice(itemPerPage * page - itemPerPage, itemPerPage * page)
        return slice;
    }
    async findOne(id) {
        const read = await data.findOne(id)
        return read
    }
    async findRoomByStatus(roomStatus) {
        const read = await data.findRoomByStatus(roomStatus)
        return read
    }
    async findByIdKind(idKindOfRoom) {
        const read = await data.findByIdKind(idKindOfRoom)
        return read
    }
    async updateOne(id, obj) {
        const doc = await data.updateOne(id, obj)
        return doc
    }
    async delete(id) {
        const doc = await data.delete(id)
        return doc
    }
    async findByIDBooking(idBooking) {
        const doc = await data.findByIDBooking(idBooking)
        return doc
    }
    async updateAny(idBooking, obj) {
        const doc = await data.updateAny(idBooking, obj)
        return doc
    }
}
export default roomDetailController