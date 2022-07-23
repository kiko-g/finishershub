const colors = require('colors')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

const env = {
  port: process.env.PORT || 5000,
  mode: process.env.NODE_ENV,
  mongoURI: process.env.MONGO_URI,
}

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connect: ${db.connection.host}`.cyan)
  } catch (error) {
    console.log(`${error.message}`.red)
    process.exit(1)
  }
}

const config = {
  env,
  connectDB,
}

module.exports = config
