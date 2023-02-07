import joi from '@hapi/joi'

const commentSchema=joi.object({
    comment:joi.string().min(2).max(100).required()
})

export default commentSchema;