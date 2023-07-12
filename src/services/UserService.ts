import { sign } from "jsonwebtoken";
import AppDataSource from "../database";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository"

export class UserService {
    private _userRepository: UserRepository;

    constructor(userRepository = new UserRepository(AppDataSource.manager)) {
        this._userRepository = userRepository
    }
        
    createUser = async (name: string, email: string, password: string): Promise<User> => {
        const user = new User(name, email, password)
        return this._userRepository.createUser(user);
    }

    getUser = async (userId: string): Promise<User | null> => {
        return await this._userRepository.getUser(userId)
    }

    getUsers = async () : Promise<User[]> => {
        return await this._userRepository.getAllUsers()
    }

    getAuthenticatedUser = async (email: string, password: string): Promise<User | null> => {
        return await this._userRepository.getUserByEmailAndPassword(email, password)
    }

    getToken = async (email: string, password: string) : Promise<string> => {
        const user = await this.getAuthenticatedUser(email, password)
        let token = ''

        if(!!user){
            const tokenData = {
                name: user?.name,
                email: user?.email
            }
    
            const tokenKey = '123456789'
    
            const tokenOptions = {
                subject: user?.id_user,
            }

            token = sign(tokenData, tokenKey, tokenOptions)
        }
        
        return token
    }
}