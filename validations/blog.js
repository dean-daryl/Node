import joi from '@hapi/joi'

const BlogSchema=joi.object({
    title:joi.string().required(),
    content:joi.string().required()
    // image:joi.string().required()
})

export default BlogSchema;