import db from "../config/database.js"
import { depositSchema } from "../model/accountModel.js"

const tokenValidation = async(req, res, next) => {
    const {authorization} = req.headers
    const token = authorization?.replace('Bearer ', '')
    if(!token) return res.sendStatus(401)
    try{
        const session = await db.collection("sessions").findOne({ token })
        if(!session) return res.sendStatus(401)
        res.locals.session = session
        next()
    }catch{
        return res.sendStatus(500)
    }
}

const financialMovimentValidation = (req, res, next) => {
    const validation = depositSchema.validate(req.body)
    if(validation.error) return res.status(400).send(`${validation.error.message}`)
    next()
}

export{
    tokenValidation,
    financialMovimentValidation
}