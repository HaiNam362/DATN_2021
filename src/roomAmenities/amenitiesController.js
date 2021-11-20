import amenitiesDetailsData from "./amenitiesDetailsData.js";
const data = new amenitiesDetailsData
class amenitiesController {
    async create(obj) {
        const doc = await data.create(obj)
        return doc
    }
    async findOne(id) {
        const doc = await data.findOne(id)
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
    async findByIdKind(idKindOfRoom) {
        const read = await data.findByIdKind(idKindOfRoom)
        return read
    }
}
export default amenitiesController