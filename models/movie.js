const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
  type: String,
  genre: String,
  directorId: String
})

module.exports = mongoose.model('Movie', movieSchema)
