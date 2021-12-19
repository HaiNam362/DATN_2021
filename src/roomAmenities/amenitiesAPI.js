import express from 'express'
import amenitiesController from './amenitiesController.js'
import amenitiesModel from "./amenitiesModel.js";
const app = express()
const roomAmenities = new amenitiesController()


app.use(express())


app.get("/:idKindOfRoom", async(req, res) => {

    const idKindOfRoom = req.params.idKindOfRoom
    const data2 = await amenitiesModel.find({ idKindOfRoom });
    res.json(data2);

});

app.post('/create', async(req, res) => {
    try {
        const data = req.body

        const doc = await roomAmenities.create(data)

        res.json(data)
    } catch (err) {
        res.json(err)
    }
})

app.delete('/delete/:id', async(req, res) => {
    const id = req.params.id
    await roomAmenities.delete({ id })
    res.json(`Delete ${id}`)
})


app.put('/update/:id', async(req, res) => {
    const id = req.params.id
    const data = req.body
    const doc1 = await roomAmenities.updateOne({ _id: id }, data)
    if (doc1) {
        res.json("Successfully!!!")
    } else {
        res.json("Failed")
    }


})




export default app