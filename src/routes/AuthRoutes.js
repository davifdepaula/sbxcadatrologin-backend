import express from 'express'
import db from '../config/database.js'
import { loginController, signUpControler } from '../controllers/authControllers.js'
import { checkLogin, checkSignUp, loginValidation, signUpValidate } from '../middlewares/authValidation.js'

const authRoutes = express.Router()

authRoutes.post('/', loginValidation, checkLogin, loginController)
authRoutes.post('/cadastro', checkSignUp, signUpValidate, signUpControler)

export default authRoutes