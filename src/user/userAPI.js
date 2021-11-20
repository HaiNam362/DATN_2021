import express from 'express'
import userController from './userController.js'

const app = express()
const user = new userController


app.use(express())


app.get('/', async(req, res) => {
    res.json("User")
})
app.post('/create', async(req, res) => {
    try {
        const data = req.body

        const doc = await user.create(data)

        res.json(req.body)
    } catch (err) {
        res.json(err)
    }
})

app.delete('/delete/:id', async(req, res) => {
    const id = req.params.id
    await user.delete({ id })
    res.json(`Delete ${id}`)
})


app.put('/update/:id', async(req, res) => {
    const id = req.params.id
    const data = req.body
    const doc1 = await user.updateOne({ _id: id }, data)
    if (doc1) {
        res.json("Successfully!!!")
    } else {
        res.json("Failed")
    }

})

app.get('/:id', async(req, res) => {
    const id = req.params.id
    const docs = await user.findOne({ _id: id })
    res.json(docs)
})



export default app