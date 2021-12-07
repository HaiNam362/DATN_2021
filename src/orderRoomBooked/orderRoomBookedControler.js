import orderRoomBookedData from "./orderRoomBookedData.js";
const data = new orderRoomBookedData
class OrderRoomBookedController {
    async create(obj) {
        const doc = await data.create(obj)
        return doc
    }
    async findBookingStatus(bookingStatus) {
        const doc = await data.findBookingStatus(bookingStatus)
        return doc
    }
    async updateOne(id, obj) {
        const doc = await data.updateOne(id, obj)
        return doc
    }
    async findPhone(phone) {
        const doc = await data.findPhone(phone)
        return doc
    }
    async delete(id) {
        const doc = await data.delete(id)
        return doc
    }
    async findone(id) {
        const doc = await data.findone(id)
        return doc
    }
}
export default OrderRoomBookedController