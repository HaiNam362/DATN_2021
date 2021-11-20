import express from 'express'



import OrderRoomBookedController from './orderRoomBookedControler.js'
import OrderRoomBookingDetailController from '../oderRoomBookingDetail/oderRoomBookingDetailController.js'
import { create, update } from './oderRoomBookedJoi.js'
import { HTTP_STATUS } from '../err/http-status.js'
const app = express()
const orderRoomBooked = new OrderRoomBookedController
const orderRoomBooking = new OrderRoomBookingDetailController

app.use(express())


app.get('/', async(req, res) => {
    res.json("orderRoomBooked")
})
app.post('/create', async(req, res, next) => {
    try {


        const data = req.body

        const validate = create.validate(data)
        if (validate.error) {
            res.status(HTTP_STATUS.BAD_REQUEST)
            res.send(validate.error)
        }
        const doc = await orderRoomBooked.create(data)
        await orderRoomBooking.create({ idBookingDetails: doc.id })
        res.json(doc)
    } catch (err) {
        res.json(err)
    }
})

app.get('/:bookingStatus', async(req, res) => {
    const bookingStatus = req.params.bookingStatus
    const docs = await orderRoomBooked.findOne({ bookingStatus })
    res.json(docs)
})

app.post('/update/:id', async(req, res) => {
    const id = req.params.id
    const data = req.body
    const validate = update.validate(data)
    if (validate.error) {
        res.status(HTTP_STATUS.BAD_REQUEST)
        res.send(validate.error)
    }
    data.updatedAt = Date.now()
    const doc1 = await orderRoomBooked.updateOne({ _id: id }, data)
    if (doc1) {
        res.json("update thanh cong")
    } else {
        res.json("update that bai")
    }

})

app.post('/delete/:id', async(req, res) => {
    const id = req.params.id
    const del1 = await orderRoomBooked.delete({ _id: id })

    if (del1) {
        await orderRoomBooking.delete({ _id: id })
        res.json(`Delete thanh cong  ${id}`)
    } else {
        res.status(HTTP_STATUS.BAD_REQUEST)
        res.json("Delete thất bại ")
    }

})
export default app