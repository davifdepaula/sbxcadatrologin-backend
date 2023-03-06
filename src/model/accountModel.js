import joi from 'joi'

const depositSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required()
})

export{
    depositSchema
}