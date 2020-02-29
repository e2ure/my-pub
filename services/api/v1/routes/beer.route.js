const { Router } = require('express')
const { isLoggedIn } = require('@my-pub/policies')

const {
  create,
  update,
  findAll,
  findOne,
} = require('../controllers/beer.controller')

const router = Router()

router.route('/').get(isLoggedIn,findAll)
router.route('/').post(isLoggedIn,create)

router.route('/:id').get(isLoggedIn,findOne)
router.route('/:id').put(isLoggedIn,update)

module.exports = router