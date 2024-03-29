import joi from 'joi'
import bcrypt from 'bcrypt'
import db from '../config/database.js'
import jsonwebtoken from 'jsonwebtoken'
import { loginSchema, signUpSchema } from '../model/authModel.js' 

const loginValidation = (req, res, next) => {
    const userValidation = loginSchema.validate(req.body)
    if(userValidation.error) return res.status(422).send(`${userValidation.error.message}`)
    next()
}

const checkLogin = async(req, res, next) => {
    const { email, password } = req.body
    try{
        const checkUser = await db.collection("Accounts").findOne({email})
        if(!checkUser || !bcrypt.compareSync(password, checkUser.password)){
            return res.status(401).send("Usuário ou senha inválidos")
        }
        res.locals.userId = checkUser._id
        next()
    }
    catch(error){
        return res.status(500).send(error)
    } 
}

const tokenValidation = async(req, res, next) => {
    const {authorization} = req.headers
    const token = authorization?.replace('Bearer ', '')
    const jwt = jsonwebtoken
    if(!token) return res.sendStatus(401)
    try{
        const SECRET = process.env.SECRET
        const jwt = jsonwebtoken
        jwt.verify(token, SECRET)        
        next()
    }catch(error){
        return res.status(500).send(error)
    }
}

const signUpValidate = async(req, res, next) => {
    const signUpValidation = signUpSchema.validate(req.body)
    if(signUpValidation.error) return res.status(422).send(`${signUpValidation.error.message}`)
    next()
}

const checkSignUp = async(req, res, next) => {
    const {email} = req.body
    try{
        const user = await db.collection("Accounts").findOne({email})
        if(user){
            return res.status(400).send("Já existe um usuário com o e-mail fornecido")
        }
        next()
    }
    catch(error){
        return res.status(500).send(error)
    } 
}
export {
    loginValidation,
    checkLogin,
    tokenValidation,
    signUpValidate,
    checkSignUp
}