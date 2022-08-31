const isEmpty = require('./isEmpty')
const validator = require('validator')


const validateArticleData = (data) => {

    let errors = {}

    data.title = !isEmpty(data.title) ? data.title : ''
    data.content = !isEmpty(data.content) ? data.content : ''
    data.categoryId = !isEmpty(data.categoryId) ? data.categoryId : ''
    data.typeId = !isEmpty(data.typeId) ? data.typeId : ''


    if (validator.isEmpty(data.title)) {
        errors.titleError = 'Article title is required'
    }

    if (validator.isEmpty(data.content)) {
        errors.contentError = 'Article content is required'
    }

    if (validator.isEmpty(data.categoryId)) {
        errors.categoryError = 'You need to provide a category'
    }
    
    return {
        errors,
        valid: isEmpty(errors)
    }

}

module.exports = {
    validateArticleData
}