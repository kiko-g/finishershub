import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

dotenv.config()
const PORT = process.env.PORT || 3000
const MONGO_ACCESS_STRING = process.env.DATABASE_URL

const app = express()

app.use(express.json())
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`)
})
