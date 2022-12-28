const mongoose = require('mongoose')

const Clients = mongoose.model('Client', {
    dni: Number,
    surname: String,
    name: String,
    age: Number,
    salary: Number
})

module.exports = Clients