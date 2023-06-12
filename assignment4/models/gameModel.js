const mongoose = require('mongoose')
let gameModel = mongoose.Schema({
    title: String,
    genre: [String],
    downloads: Number,
})

module.exports = mongoose.model('GameModel', gameModel)