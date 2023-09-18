import mongoose, { Schema, model } from "mongoose"

if (typeof mongoose.models.Sound !== undefined) delete mongoose.models.Sound

const schema = new Schema(
  {
    setting: String,
    value: Boolean,
  },
  {
    collection: "Sound",
  },
)

const Model = model("Sound", schema)

export default Model
