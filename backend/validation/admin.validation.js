const isEmpty = require('./isEmpty')
const validator = require('validator')


const validateSaveAdmin = (data) => {
    let errors = {}

    data.firstName = !isEmpty(data.firstName) ? data.firstName : ''
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ''
    data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : ''
    data.userName = !isEmpty(data.userName) ? data.userName : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.role = !isEmpty(data.role) ? data.role : ''


    if (validator.isEmpty(data.firstName)) {
        errors.firstNameError = 'First name is required'
    }

    if (validator.isEmpty(data.lastName)) {
        errors.lastNameError = 'Last name is required'
    }

    if (validator.isEmpty(data.dateOfBirth)) {
        errors.dobError = 'Date of Birth is required'
    }

    if (validator.isEmpty(data.userName)) {
        errors.userNameError = 'Username is required'
    }

    if (validator.isEmpty(data.password)) {
        errors.passwordError = 'Password is required'
    }

    if (validator.isEmpty(data.role)) {
        errors.roleError = 'Role is required'
    }

    return {
        errors,
        valid: isEmpty(errors),
    }
}

const validateLoginAdmin = (data) => {
    let errors = {}

    data.userName = !isEmpty(data.userName) ? data.userName : ''
    data.password = !isEmpty(data.password) ? data.password : ''


    if (validator.isEmpty(data.userName)) {
        errors.userNameError = 'Username is required'
    }

    if (validator.isEmpty(data.password)) {
        errors.passwordError = 'Password is required'
    }


    return {
        errors,
        valid: isEmpty(errors),
    }
}

module.exports = {
    validateSaveAdmin,
    validateLoginAdmin
}