import oderRoomBookingDetailModel from "./oderRoomBookingDetailModel.js";
class orderRoomBookingDetail {
    async create(obj) {
        const doc = await oderRoomBookingDetailModel.create(obj)
        return doc
    }
    async findOne(idBookingDetails) {
        const doc = await oderRoomBookingDetailModel.findOne(idBookingDetails)
        return doc
    }
    async delete(id) {
        const doc = await oderRoomBookingDetailModel.deleteOne(id)
        return doc
    }
}
export default orderRoomBookingDetail