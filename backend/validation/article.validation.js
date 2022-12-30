const isEmpty = require('./isEmpty')
const validator = require('validator')


const validateArticleData = (data) => {

    let errors = {}

    data.title = !isEmpty(data.title) ? data.title : ''
    data.content = !isEmpty(data.content) ? data.content : ''
    data.typeId = !isEmpty(data.typeId) ? data.typeId : ''


    if (validator.isEmpty(data.title)) {
        errors.titleError = 'Article title is required'
    }

    if (validator.isEmpty(data.content)) {
        errors.contentError = 'Article content is required'
    }
    
    return {
        errors,
        valid: isEmpty(errors)
    }

}

module.exports = {
    validateArticleData
}