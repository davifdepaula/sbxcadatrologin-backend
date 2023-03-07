import bcrypt from 'bcrypt'
import db from '../config/database.js'
import jsonwebtoken from 'jsonwebtoken'

const loginController = async(req, res) => {
    const { userId } = res.locals
    try{
        const SECRET = process.env.SECRET
        const jwt = jsonwebtoken
        const token = jwt.sign({id: userId}, SECRET)
        console.log(token)
        return res.send({token})
    }catch(error){
        return res.status(500).send(error)
    }
}
const signUpControler = async(req, res) => {
    const {name, email, password} = req.body
    try{
        const passwordHash = bcrypt.hashSync(password, 10)
        await db.collection("Accounts").insertOne({name, email, password: passwordHash})
        return res.sendStatus(201)
    }catch(error) {
        return res.sendStatus(500)
    }
}


export {
    loginController,
    signUpControler
}