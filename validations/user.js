import joi from '@hapi/joi'

const UserSchema=joi.object({
    name:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().min(4).max(10).required()
   
})

export default UserSchema;