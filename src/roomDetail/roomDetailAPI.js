import express from 'express'
import roomDetailController from './roomDetailController.js'

const app = express()
const roomDetail = new roomDetailController


app.use(express())


app.get('/', async(req, res) => {
    res.json("roomDetail")
})
app.get('/all', async(req, res) => {
    let pageNo = req.query.page
    if (pageNo == undefined) {
        pageNo = 1
    }
    const docs = await roomDetail.findAll(pageNo)
    res.json(docs)
})
app.get('/getAllByStatus/:roomStatus', async(req, res) => {
    const roomStatus = req.params.roomStatus
    const docs = await roomDetail.findRoomByStatus({ roomStatus })
    res.json(docs)
})

app.get('/getAllByIdKind/:idKindOfRoom', async(req, res) => {
    const idKindOfRoom = req.params.idKindOfRoom
    const docs = await roomDetail.findByIdKind({ idKindOfRoom })
    res.json(docs)
})

app.get('/idBooking/:idBooking', async(req, res) => {
    const idBooking = req.params.idBooking
    const docs = await roomDetail.findByIDBooking({ idBooking })
    res.json(docs)
})

app.post('/create', async(req, res) => {
    try {
        const data = req.body

        const doc = await roomDetail.create(data)

        res.json(doc)
    } catch (err) {
        res.json(err)
    }
})


app.delete('/delete/:id', async(req, res) => {
    const id = req.params.id
    await roomDetail.delete({ _id: id })
    res.json(`Delete ${id}`)
})


app.put('/update/:id', async(req, res) => {
    const id = req.params.id
    const data = req.body
    const doc1 = await roomDetail.updateOne({ _id: id }, data)
    if (doc1) {
        res.json({ "message": "Successfully!!!" })
    } else {
        res.json({ "message": "Failed" })
    }

})
app.post('/updateAny/:idBooking', async(req, res) => {
    const idBooking = req.params.idBooking
    const data = req.body

    const doc = await roomDetail.updateAny(idBooking, data)
    if (doc) {
        return res.status(200).send({
            message: 'update  successfully',
            data: data
        })
    } else {
        res.status(404).send(error)

    }
})
app.get('/:id', async(req, res) => {
    const id = req.params.id
    const docs = await roomDetail.findOne({ _id: id })
    res.json(docs)
})



export default app