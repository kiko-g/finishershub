import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    id: Number,
    name: String,
    finishers: [Number],
    aliases: [String],
    code: String,
    imgurUrl: String,
  },
  {
    collection: 'Registry',
  }
)

const Model = model('Registry', schema)

export default Model
