const mongoose = require('mongoose')

const schema = mongoose.Schema({
  id: Number,
  name: String,
  finishers: Number,
  aliases: [String],
})

module.exports = mongoose.model('Registry', schema)
