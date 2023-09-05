import mongoose, { Schema, model } from 'mongoose'

if (typeof mongoose.models.Videos !== undefined) delete mongoose.models.Videos

const schema = new Schema(
  {
    id: Number,
    authors: [String],
    quantity: Number,
    tags: [String],
    map: String,
    location: String,
    game: String,
    bucket: String,
    s3_uri: String,
  },
  {
    collection: 'Videos',
  },
)

const Model = model('Videos', schema)

export default Model
