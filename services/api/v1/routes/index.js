const { Router } = require('express')

const auth = require('./auth.route')

const router = Router()

router.use('/auth', auth)

module.exports = router