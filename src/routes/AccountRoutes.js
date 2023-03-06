import express from 'express'
import { deposit, getInfomation, withdraw } from '../controllers/accountControllers.js'
import { financialMovimentValidation, tokenValidation } from '../middlewares/accountValidation.js'

const accountRoutes = express.Router()
accountRoutes.get("/home", tokenValidation, getInfomation)
accountRoutes.post("/nova-entrada", tokenValidation, financialMovimentValidation, deposit)
accountRoutes.post("/nova-saida", tokenValidation, financialMovimentValidation, withdraw)

export default accountRoutes