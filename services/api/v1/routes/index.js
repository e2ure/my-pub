const { Router } = require('express')

const auth = require('./auth.route')
const drik = require('./beer.route')

const router = Router()

router.use('/auth', auth)
router.use('/drink', auth)

module.exports = router