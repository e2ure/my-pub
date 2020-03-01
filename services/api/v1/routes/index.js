const { Router } = require('express')

const auth = require('./auth.route')
const drink = require('./beer.route')
const userDrink = require('./userDrink.route')

const router = Router()

router.use('/auth', auth)
router.use('/drink', drink)
router.use('/userdrink', userDrink)

module.exports = router