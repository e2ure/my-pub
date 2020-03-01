const { Router } = require('express')
const { isLoggedIn } = require('@my-pub/policies')

const {
  create,
  findAll,
  findOne,
} = require('../controllers/userDrink.controller')

const router = Router()

router.route('/').get(isLoggedIn,findAll)
router.route('/').post(isLoggedIn,create)

router.route('/:id').get(isLoggedIn,findOne)

module.exports = router