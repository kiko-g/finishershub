const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = Schema(
  {
    id: Number,
    name: String,
    finishers: Number,
    aliases: [String],
  },
  {
    collection: 'Registry',
  }
)

module.exports = mongoose.model('Registry', schema)
