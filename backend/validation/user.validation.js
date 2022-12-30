const isEmpty = require('./isEmpty')
const validator = require('validator')

const validateSignUpUser = (data) => {

    let errors = {}

    data.firstName = !isEmpty(data.firstName) ? data.firstName : ''
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : ''
    data.userName = !isEmpty(data.userName) ? data.userName : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    if (validator.isEmpty(data.firstName)) {
        errors.firstNameError = 'First name is required'
    }

    if (validator.isEmpty(data.lastName)) {
        errors.lastNameError = 'Last name is required'
    }

    if (validator.isEmpty(data.email)) {
        errors.emailError = 'Email is required'
    } else if (!validator.isEmail(data.email)) {
        errors.emailError = 'Email format is not valid'
    }

    if (validator.isEmpty(data.dateOfBirth)) {
        errors.dateOfBirthError = 'Date of birth is required'
    }

    if (validator.isEmpty(data.userName)) {
        errors.userNameError = 'User name is required'
    }

    if (validator.isEmpty(data.password)) {
        errors.passwordError = 'Password is required'
    } else if (data.password.length < 8) {
        errors.passwordError = 'Password length must be greater than 8 characters'
    }


    return {
        errors,
        valid: isEmpty(errors)
    }
}

const validateSignInUser = (data) => {
    let errors = {}


    data.userName = !isEmpty(data.userName) ? data.userName : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    if (validator.isEmpty(data.userName)) {
        errors.loginError = 'User name or email is required'
    }

    if (validator.isEmpty(data.password)) {
        errors.passwordError = 'Password is required'
    }

    return {
        errors,
        valid: isEmpty(errors)
    }
}

const validateUpdateProfile = (data) => {

    let errors = {}

    data.firstName = !isEmpty(data.firstName) ? data.firstName : ''
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ''
    data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : ''
    data.userName = !isEmpty(data.userName) ? data.userName : ''
    data.bio = !isEmpty(data.bio) ? data.bio : ''


    if (validator.isEmpty(data.firstName)) {
        errors.firstNameError = 'First name is required'
    }

    if (validator.isEmpty(data.lastName)) {
        errors.lastNameError = 'Last name is required'
    }

    if (validator.isEmpty(data.dateOfBirth)) {
        errors.dateOfBirthError = 'Date of birth is required'
    }

    if (validator.isEmpty(data.userName)) {
        errors.userNameError = 'Username is required'
    }
    
    return {
        errors,
        valid: isEmpty(errors)
    }
}

module.exports = {
    validateSignUpUser,
    validateSignInUser,
    validateUpdateProfile
}