import amenitiesModel from "./amenitiesModel.js";
import roomDetailModel from "../roomDetail/roomDetailModel.js";

class amenitiesDetailsData {
    async create(obj) {
        const doc = await amenitiesModel.create(obj);
        return doc;
    }
    async updateOne(id, obj) {
        const doc = await amenitiesModel.updateOne({ _id: id }, { $set: obj });
        return doc;
    }
    async delete(id) {
        const doc = await amenitiesModel.deleteOne(id);
        return doc;
    }
    async findByIdKindOfRoom(idKindOfRoom) {
        const doc = await amenitiesModel.find(idKindOfRoom);
        return doc;
    }
}
export default amenitiesDetailsData