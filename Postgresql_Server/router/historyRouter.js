const historyRouter = require('express').Router()
const HistoryController = require('../controller/historyController')

historyRouter.get('/', (req, res) => {
    res.status(200).json({
        msg: 'History Router Connected'
    })
})

historyRouter.get('/history',HistoryController.getHistory)
historyRouter.post('/add', HistoryController.addHistory)

module.exports = historyRouter