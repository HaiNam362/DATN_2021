import userModel from "./userModel.js";

class userDetailsData {
    async create(obj) {
        const doc = await userModel.create(obj)
        return doc
    }
    async findOne(id) {
        const doc = await userModel.findById(id)
        return doc
    }
    async updateOne(id, obj) {
        const doc = await userModel.updateOne({ _id: id }, { $set: obj })
        return doc
    }
    async delete(id) {
        const doc = await userModel.deleteOne(id)
        return doc
    }
}
export default userDetailsData