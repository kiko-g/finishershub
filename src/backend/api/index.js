import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'

config()

const env = {
  port: process.env.PORT || 3000,
  mongodbURL: process.env.MONGODB_URI,
}
const app = express()
app.use(express.json())
app.listen(env.port, () => console.log(`Server running on port ${env.port}`))

mongoose
  .connect(env.mongodbURL)
  .then(() => console.log('Connected!'))
  .catch(error => {
    console.log('Failed!')
    console.log(error.message)
  })
