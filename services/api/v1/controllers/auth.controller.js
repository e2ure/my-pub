const Auth = require('@my-pub/auth')

async function signup(req, res, next) {
  try {
    const data = await Auth.signup(req.body)

    res.success({
      message: 'Usuario registrado exitosamente',
      data,
    })
  } catch (error) {
    next(error)
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body
    const data = await Auth.login(email, password)

    res.success({
      message: 'Usuario autenticado exitosamente',
      data,
    })
  } catch (error) {
    next(error)
  }
}

async function logout(req, res) {
  const data = await Auth.logout()
  res.success(data)
}


module.exports = {
  signup,
  login,
  logout,
}
