import dayjs from "dayjs"
import db from "../config/database.js"

const deposit = async(req, res) => {
    const {id} = res.locals.session
    const {value, description} = req.body
    try{
        const account = await db.collection("Accounts").findOne({_id: id})
        const checkingAccount = [...account.checkingAccount, {_id: id, value, description, type: 'deposit', date: dayjs(Date.now()).format("DD/MM")}]
        const balance = Number(value) + account.balance
        await db.collection("Accounts").updateOne({_id: id}, 
            {$set: {checkingAccount, balance}})
        return res.sendStatus(200)
    }catch(error){
        return res.status(500).send(error)
    }
}

const withdraw = async(req, res) => {
    const {id} = res.locals.session
    const {value, description} = req.body
    try{
        const account = await db.collection("Accounts").findOne({_id: id})
        const checkingAccount = [...account.checkingAccount, {id: id, value, description, type: 'withdraw', date: dayjs(Date.now()).format("DD/MM")}]
        const balance =  account.balance - Number(value)
        await db.collection("Accounts").updateOne({_id: id}, 
            {$set: {checkingAccount, balance}})
        return res.sendStatus(200)
    }catch(error){
        return res.status(500).send(error)
    }
}

const getInfomation = async(req, res) => {
    const {id} = res.locals.session
    try{
        const user = await db.collection("Accounts").findOne({_id: id})
        return res.status(200).send(
            {id: user._id, 
            name: user.name, 
            checkingAccount: user.checkingAccount,  
            balance: user.balance 
        })
    }catch{
        return res.sendStatus(500)
    }
}

export {
    deposit,
    withdraw,
    getInfomation
}