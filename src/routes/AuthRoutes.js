import express from 'express'
import db from '../config/database.js'
import { loginController, signUpControler } from '../controllers/authControllers.js'
import { checkLogin, checkSignUp, loginValidation, signUpValidate, tokenValidation } from '../middlewares/authValidation.js'

const authRoutes = express.Router()

authRoutes.post('/', loginValidation, checkLogin, loginController)
authRoutes.post('/cadastro', checkSignUp, signUpValidate, signUpControler)
authRoutes.get('/home', tokenValidation, (req, res) => {
  return res.send({msg: 'usuario validado com sucesso'})  
})

export default authRoutes