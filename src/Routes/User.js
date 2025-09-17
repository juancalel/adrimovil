import { Router } from 'express'
import { UserController } from '../controllers/UserController.js'
import AuthenticationMiddleware from '../Middlewares/AuthenticationMiddleware.js'

export const UserRouter = Router()

UserRouter.get('/', AuthenticationMiddleware, UserController.getAll)
UserRouter.get('/:id', AuthenticationMiddleware, UserController.getById)
UserRouter.patch('/:id', AuthenticationMiddleware, UserController.updateUser)
UserRouter.delete('/:id', AuthenticationMiddleware, UserController.deleteUser)
