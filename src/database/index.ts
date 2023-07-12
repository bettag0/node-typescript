import { DataSource } from "typeorm"
import { User } from "../entities/User"

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/db.sqlite",
    migrations: [
        "./src/database/migrations/*.ts"
    ],
    entities: [
        User
    ]
})

export default AppDataSource;