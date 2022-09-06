const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: String,
        required: true
    },

    userName: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role : {
        type: String,
        default: 'Admin'
    }
    
}, { timestamps: true })

module.exports = mongoose.model('admin', AdminSchema)