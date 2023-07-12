import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/UserService'

export class LoginController {
    _userService: UserService

    constructor(userService = new UserService()){
        this._userService = userService
    }

    login = async (request: Request, response: Response, next: NextFunction) => {
        const { email, password } = request.body

        const token = await this._userService.getToken(email, password)

        token.length > 0 ? response.status(200).json({ token }) : response.sendStatus(404)
    }
}