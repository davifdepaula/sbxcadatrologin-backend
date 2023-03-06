import bcrypt from 'bcrypt'
import {v4 as uuidV4} from 'uuid'
import db from '../config/database.js'

const loginController = async(req, res) => {
    const { email, password } = req.body
    try{
        const user = await db.collection("Accounts").findOne({email})
        const token = uuidV4()
        await db.collection("sessions").insertOne({id: user._id, name: user.name, token})
        return res.send(token)
    }catch(error){
        return res.status(500).send(error)
    }
}
const signUpControler = async(req, res) => {
    const {name, email, password} = req.body
    const checkingAccount = []


    try{
        const passwordHash = bcrypt.hashSync(password, 10)
        await db.collection("Accounts").insertOne({name, email, password: passwordHash, checkingAccount, balance: 0})
        return res.sendStatus(201)
    }catch(error) {
        return res.sendStatus(500)
    }
}


export {
    loginController,
    signUpControler
}