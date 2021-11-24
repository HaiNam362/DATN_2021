import { expiredHrs } from "../math/time.js";

import orderRoomBookingDetail from "./oderRoomBookingDetailData.js";
const orderRoomBookingDetailData = new orderRoomBookingDetail;
class OrderRoomBookingDetailController {
    async create(obj) {
        const doc = await orderRoomBookingDetailData.create(obj);
        return doc
    }
    async findOne(idBooking) {
        const doc = await orderRoomBookingDetailData.findOne(idBooking)
        return doc
    }
    async delete(id) {
        const doc = await orderRoomBookingDetailData.delete(id)
        return doc
    }
}
export default OrderRoomBookingDetailController