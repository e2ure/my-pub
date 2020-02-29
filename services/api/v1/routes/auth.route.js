const { Router } = require('express')

const { isLoggedIn } = require('@my-pub/policies')

const {
  login,
  logout,
  signup,
} = require('../controllers/auth.controller')

const router = Router()

router.route('/signup').post(signup)

router.route('/login').post(login)

router.route('/logout').post(isLoggedIn, logout)

module.exports = router
