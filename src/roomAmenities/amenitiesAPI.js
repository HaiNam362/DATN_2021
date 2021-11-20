import express from 'express'
import amenitiesController from './amenitiesController.js'

const app = express()
const roomAmenities = new amenitiesController()


app.use(express())


app.get('/', async(req, res) => {
    res.json("roomAmenities")
})
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

app.get('/getAllByIdKind/:idKindOfRoom', async(req, res) => {
    const idKindOfRoom = req.params.idKindOfRoom
    const docs = await roomAmenities.findByIdKind({idKindOfRoom})
    res.json(docs)
})

app.get('/:id', async(req, res) => {
    const id = req.params.id
    const docs = await roomAmenities.findOne({ _id: id })
    res.json(docs)
})



export default app