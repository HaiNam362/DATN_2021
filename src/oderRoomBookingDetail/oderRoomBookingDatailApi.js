import express from 'express'

import OrderRoomBookingDetailController from '../oderRoomBookingDetail/oderRoomBookingDetailController.js'



const app = express()
const orderRoomBooking = new OrderRoomBookingDetailController


app.get('/:idBookingDetails', async(req, res) => {
    try {
        const idBookingDetails = req.params.idBookingDetails
        const docs = await orderRoomBooking.findOne({ idBookingDetails })
        res.json(docs)
    } catch (error) {
        res.status(500).send(error);
    }
})


export default app