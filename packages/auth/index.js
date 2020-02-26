const StandardError = require('standard-error')
const bigdecimal = require('bigdecimal')
const { jwt } = require('./jwt')
const vars = require('@my-pub/vars')
const {
  User,
} = require('@my-pub/db')
const bcrypt = require('bcryptjs')
const validator = require('validator')

async function signup(user) {
  const {
    email,
    password,
    name,
    lastname,
    secondlastname,
  } = user

  if (!email) {
    throw new StandardError('El correo electrónico es requerido!', {
      status: 400,
    })
  }

  if (!password) {
    throw new StandardError('La contraseña es requerido!', {
      status: 400,
    })
  }

  if (!name) {
    throw new StandardError('El nombre es requerido!', { status: 400 })
  }

  if (!validator.isEmail(email)) {
    throw new StandardError('El email indicado es incorrecto', {
      status: 400,
    })
  }

  const searchUser = await User.findOne({
    where: { email: email.toLowerCase() },
  })
  if (searchUser) {
    throw new StandardError('Ya te has registrado anteriormente!', {
      status: 400,
    })
  }

  let hashPassword = ''
  try {
    hashPassword = await bcrypt.hash(password, 10)
  } catch (error) {
    throw new StandardError(error.message, { status: 500 })
  }

  const data = await User.create({
    name,
    lastname,
    password: hashPassword,
    email: email.toLowerCase(),
    secondlastname,
  })
  if (!data) {
    throw new StandardError('Error al tratar de registrarse', {
      status: 404,
    })
  }  

  return data ? data.toJSON() : data
}

async function login(email, password, roleType, applicationId) {
  if (!email || !password) {
    throw new StandardError(
      'Para ingresar es requerido el correo y la contraseña',
      { status: 400 }
    )
  }

  const data = await User.findOne({
    where: {
      email,
    },
  })

  if (!data) {
    throw new StandardError(
      'No se encontró el usuario',
      { status: 404 }
    )
  }

  const validPass = await bcrypt.compare(password, data.password)
  if (!validPass) {
    throw new StandardError('El correo o la contraseña no corresponden!', {
      status: 404,
    })
  }

  delete data.dataValues.password

  const token = await jwt.sign({
    id: data.id,
  })
  data.dataValues.token = token

  return data ? data.toJSON() : data
}

async function logout() {
  return { message: 'Usuario deslogeado exitosamente' }
}

module.exports = {
  signup,
  login,
  logout,
}
