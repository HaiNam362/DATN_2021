import orderRoomBookedData from "./orderRoomBookedData.js";
const data = new orderRoomBookedData
class OrderRoomBookedController {
    async create(obj) {
        const doc = await data.create(obj)
        return doc
    }
    async findOne(bookingStatus) {
        const doc = await data.findOne(bookingStatus)
        return doc
    }
    async updateOne(id, obj) {
        const doc = await data.updateOne(id, obj)
        return doc
    }
    async delete(id) {
        const doc = await data.delete(id)
        return doc
    }
}
export default OrderRoomBookedController