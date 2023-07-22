import mongoose, { Schema, model } from 'mongoose'

if (typeof mongoose.models.Registry !== undefined) delete mongoose.models.Registry

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
  },
)

const Model = model('Registry', schema)

export default Model
