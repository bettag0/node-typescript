import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/UserService'



export class UserController {
   userService: UserService

    constructor(userService = new UserService()) {
        this.userService = userService
    } 

    createUser = async (request: Request, response: Response, next: NextFunction) => {
        const user = request.body;

        if(!user.name) {
            response.status(400).json({message: 'O nome deve ser informado.'})
        } else if(!user.email) {
            response.status(400).json({message: 'O email deve ser informado.'})
        } else if(!user.password) {
            response.status(400).json({message: 'A senha deve ser informada.'})
        } else {
            const userCreated = await this.userService.createUser(user.name, user.email, user.password)
            if (!!userCreated) {
                response.status(201).json(user)
            }
        }
    }
    getUsers = async (request: Request, response: Response, next: NextFunction) => {
        const users = await this.userService.getUsers();
        response.status(200).json(users)
    }

    getUser = async (request: Request, response: Response, next: NextFunction) => {
        const { userId } = request.params

        const user = await this.userService.getUser(userId)

        return response.status(200).json({
            userId: user?.id_user,
            name: user?.name,
            email: user?.email
        })
    }
}
