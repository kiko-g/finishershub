const mongoose = require('mongoose')

const schema = mongoose.Schema(
  {
    id: Number,
    name: String,
    finishers: Number,
    aliases: [String],
    code: String,
    imgurUrl: String,
  },
  {
    collection: 'Registry',
  }
)

module.exports = mongoose.model('Registry', schema)
