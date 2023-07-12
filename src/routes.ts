import { Router } from "express"
import { UserController } from "./controllers/UserController"
import { LoginController } from "./controllers/LoginController"
import { verifyAuth } from "./middlewares/VerifyAuth"


const router = Router()

const userController = new UserController()
const loginController = new LoginController()

// rotas de usuário
router.post('/user', userController.createUser)
router.get('/user', userController.getUsers)
router.get('/user/:userId', verifyAuth, userController.getUser)

// rota de login

router.post('/login', loginController.login)


export default router