const router = require('express').Router()
const userController = require('../controller/Controller')

router.get('/', (req, res) => {
    return res.status(200).json({
        msg: 'Mongo Domain Connected'
    })
})
router.post('/register', userController.Register)
router.post('/login', userController.Login)
router.get('/users', userController.findAll)

module.exports = router