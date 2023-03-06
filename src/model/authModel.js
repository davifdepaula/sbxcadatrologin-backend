import joi from "joi"

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
})



export {
    loginSchema,
    signUpSchema

}