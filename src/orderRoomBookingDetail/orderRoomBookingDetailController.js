import { expiredHrs } from "../math/time.js";

import orderRoomBookingDetail from "./orderRoomBookingDetailData.js";
const orderRoomBookingDetailData = new orderRoomBookingDetail;
class OrderRoomBookingDetailController {
    async create(obj) {
        const doc = await orderRoomBookingDetailData.create(obj);
        return doc
    }
    async findByIDBooking(idBooking) {
        const doc = await orderRoomBookingDetailData.findByIDBooking(idBooking)
        return doc
    }
    async delete(id) {
        const doc = await orderRoomBookingDetailData.delete(id)
        return doc
    }
}
export default OrderRoomBookingDetailController