const isEmpty = require('./isEmpty')
const validator = require('validator')

const validateBody = (data) => {

    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ''

    if (validator.isEmpty(data.name)) {
        errors.nameError = 'Category name is required'
    }

    return {
        errors,
        valid: isEmpty(errors)
    }
}

module.exports = {
    validateBody
}