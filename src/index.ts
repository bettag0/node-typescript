import express, { Request, Response, NextFunction } from 'express'
import 'reflect-metadata'
import router from './routes'
import AppDataSource from './database'
const host = 'http://localhost'
const port = 5000

const server = express()

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source inicializado!")
    })
    .catch((err) => {
        console.error(err)
    })


server.use(express.json())
server.use(router)

server.get('/', (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json({message: 'DioBank API.'})
})

server.listen(port, () => {
    console.log(`Server escutando no endereço ${host}:${port}`)
})