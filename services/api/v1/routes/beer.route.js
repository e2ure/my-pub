const { Router } = require('express')
const { isLoggedIn } = require('@my-pub/policies')

const {
  create,
} = require('../controllers/beer.controller')

const router = Router()

router.route('/').post(isLoggedIn,create)

module.exports = router