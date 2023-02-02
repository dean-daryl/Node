import joi from '@hapi/joi'

const QuerySchema=joi.object({
    name:joi.string().required(),
    message:joi.string().required()
  
})

export default QuerySchema;