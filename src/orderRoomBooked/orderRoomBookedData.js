import orderRoomBookedModel from "./orderRoomBookedModel.js";
class orderRoomBookedData {
    async create(obj) {
        const doc = await orderRoomBookedModel.create(obj)
        return doc
    }
    async findOne(bookingStatus) {
        const doc = await orderRoomBookedModel.findOne(bookingStatus)
        return doc
    }
    async updateOne(id, obj) {
        const doc = await orderRoomBookedModel.updateOne({ _id: id }, { $set: obj })
        return doc
    }
    async delete(id) {
        const doc = await orderRoomBookedModel.deleteOne(id)
        return doc
    }
}
export default orderRoomBookedData