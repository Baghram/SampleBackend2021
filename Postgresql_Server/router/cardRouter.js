const card = require('../models/card')

const cardRouter = require('express').Router()
const cardController = require('../controller/cardController')

cardRouter.get('/', (req, res) => {
    res.status(200).json({
        msg: 'Card Router Connected'
    })
})

cardRouter.get('/card', cardController.getCard)
cardRouter.post('/card', cardController.addCard)
cardRouter.put('/card/:id', cardController.updateCard)
cardRouter.delete('/card/:id', cardController.deleteCard)




module.exports = cardRouter