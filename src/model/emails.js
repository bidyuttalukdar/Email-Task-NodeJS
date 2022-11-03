const mongoose = require('mongoose')

const emailSchema=new mongoose.Schema({
    to: {
        type: String,
        required: true,
        trim: true
    },
    from: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required:true,
    },
    sendTimeStamp: {
        type: String,
        required: true,
        trim: true
    },
    isSend: {
        type: Boolean,
        default:false,
    },
}, {
  timestamps:true  
})
const Email = mongoose.model('Email', emailSchema)

module.exports = Email