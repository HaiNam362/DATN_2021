import oderRoomBookingDetailModel from "./orderRoomBookingDetailModel.js";
class orderRoomBookingDetail {
    async create(obj) {
        const doc = await oderRoomBookingDetailModel.create(obj)
        return doc
    }
    async findByIDBooking(idBooking) {
        const doc = await oderRoomBookingDetailModel.find(idBooking)
        return doc
    }
    async delete(id) {
        const doc = await oderRoomBookingDetailModel.deleteOne(id)
        return doc
    }
}
export default orderRoomBookingDetail