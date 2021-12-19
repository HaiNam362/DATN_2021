import amenitiesDetailsData from "./amenitiesDetailsData.js";
const data = new amenitiesDetailsData
class amenitiesController {
    async create(obj) {
        const doc = await data.create(obj)
        return doc
    }
    async findOne(idKindOfRoom) {
        const doc = await data.findOne(idKindOfRoom)
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
export default amenitiesController