import express from 'express'



import OrderRoomBookedController from './orderRoomBookedControler.js'

import { create, update } from './oderRoomBookedJoi.js'
import { HTTP_STATUS } from '../err/http-status.js'
const app = express()
const orderRoomBooked = new OrderRoomBookedController


app.use(express())


app.get('/:id', async(req, res) => {
    const id = req.params.id
    const docs = await orderRoomBooked.findone({ _id: id })
    res.json(docs)
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
        res.json(doc)
    } catch (err) {
        res.json(err)
    }
})

app.get('/getOrderByBookingStatus/:bookingStatus', async(req, res) => {
    const bookingStatus = req.params.bookingStatus
    const docs = await orderRoomBooked.findBookingStatus({ bookingStatus })

    res.json(docs)
})
app.get('/phone/:phone', async(req, res) => {
    const phone = req.params.phone
    const docs = await orderRoomBooked.findPhone({ phone })
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

        return res.status(200).send({
            message: 'update  successfully',
            data: data
        })
    } else {
        res.status(404).send(error)
    }

})

app.post('/delete/:id', async(req, res) => {
    const id = req.params.id
    const del1 = await orderRoomBooked.delete({ _id: id })

    if (del1) {
        res.json({ "message": `Delete thanh cong  ${id}` })
    } else {
        res.status(HTTP_STATUS.BAD_REQUEST)
        res.json({ "message": "Delete thất bại " })
    }

})
export default app
