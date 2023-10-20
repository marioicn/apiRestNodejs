const Join = require('joi')

const id= Join.string().uuid()
const name= Join.string().min(3).max(15)
const job= Join.string().min(3).max(15)

const createUserSchema =Join.object({
    name:name.required(),
    job:job.required()
})

const updateUserSchema = Join.object({
    name:name,
    job:job
})

const putUpdateUserSchema = Join.object({
    name:name.required(),
    job:job.required()
})

const getUserSchema = Join.object({
    id:id.required()
})


module.exports={createUserSchema,updateUserSchema,getUserSchema,putUpdateUserSchema}