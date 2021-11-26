import express from 'express'

import OrderRoomBookingDetailController from './orderRoomBookingDetailController.js'



const app = express()
const orderRoomBooking = new OrderRoomBookingDetailController

app.post('/create', async(req, res) => {
    try {
        const data = req.body
        const doc = await orderRoomBooking.create(data)
        res.json(doc)
    } catch (error) {
        res.status(400).send(error);
    }
})

app.get('/:idBooking', async(req, res) => {
    try {
        const idBooking = req.params.idBooking
        const docs = await orderRoomBooking.findByIDBooking({ idBooking })
        res.json(docs)
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post('/delete/:id', async(req, res) => {
    const id = req.params.id
    const del1 = await orderRoomBooking.delete({ _id: id })

    if (del1) {
        res.json({ "message": `Delete thanh cong  ${id}` })
    } else {
        res.status(400)
        res.json({ "message": "Delete thất bại " })
    }
})

export default app