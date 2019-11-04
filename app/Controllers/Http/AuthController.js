'use strict'
const UserService = use('App/Services/UserService')
const Config = use('Config')
const apiConfig = Config.get('apiConfig')

class AuthController {
  async login ({ request, response }) {
    const { name, password } = request.all()
    try {
    let existingUser = await UserService.getUserByName(name)
    if (existingUser && existingUser.active != apiConfig.user.active.true) {
      return response.status(401).send({ message: 'Invalid user' })
    } else if (!existingUser){
      return response.status(401).send({ message: 'Invalid user' })
    }
    let verify = await UserService.validatePassword(password, existingUser.password)
    if (verify) {
      return response.status(200).send({authorization: existingUser.password})
    } else {
      return response.status(400).send({message: 'Invalid user'})
    }
    } catch (error) {
      return response.status(400).send({message: 'error happened'})
    }
  }

  // async logout ({ auth, response }) {
  //   const apiToken = auth.getAuthHeader()
  //   await auth.authenticator('jwt').revokeTokens([apiToken])
  //   return response.send({ message: 'Berhasil Logout' })
  // }

  // async refreshToken ({ request, auth }) {
  //   const refreshToken = request.input('refreshToken')
  //   return auth.newRefreshToken().generateForRefreshToken(refreshToken)
  // }
}

module.exports = AuthController
