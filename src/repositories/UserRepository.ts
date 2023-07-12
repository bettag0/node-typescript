import { EntityManager } from "typeorm";
import { User } from "../entities/User";

export class UserRepository {
    private _manager: EntityManager
    

    constructor(
        manager: EntityManager
    ) {
        this._manager = manager;
    }

    createUser = async (user: User): Promise<User> => {
        return this._manager.save(user)
    }

    getUser = async (userId: string): Promise<User | null> => {
        return this._manager.findOne(User, {
            where: { 
                id_user: userId
             }
        })
    }

    getAllUsers = async (): Promise<User[]> => {
        return this._manager.find(User)
    }

    getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
        return this._manager.findOne(User, {
            where: {
                email,
                password
            }
        })
    }
}