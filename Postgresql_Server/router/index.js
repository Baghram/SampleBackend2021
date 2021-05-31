const routes = require('express').Router()
const cardRoutes = require('./cardRouter')
const historyRoutes = require('./historyRouter')

routes.use('/card', cardRoutes);
routes.use('/history', historyRoutes);

routes.get('/', (req, res) => {
    res.status(200).json({
        msg: 'Home Domain Connected'
    })
})

module.exports = routes