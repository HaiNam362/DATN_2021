import roomDetailModel from "./roomDetailModel.js";

class roomDetailData {
    async create(obj) {
        const doc = await roomDetailModel.create(obj)
        return doc
    }
    async findOne(id) {
        const doc = await roomDetailModel.findById(id)
        return doc
    }
    async updateOne(id, obj) {
        const doc = await roomDetailModel.updateOne({ _id: id }, { $set: obj })
        return doc
    }
    async findRoomByStatus(roomStatus){
        const doc = await roomDetailModel.find(roomStatus)
        return doc
    }
    async findAll() {
        const doc = await roomDetailModel.find()
        return doc
    }
    async findByIdKind(idKindOfRoom){
        const doc = await roomDetailModel.find(idKindOfRoom)
        return doc
    }
    async delete(id) {
        const doc = await roomDetailModel.deleteOne(id)
        return doc
    }

}
export default roomDetailData