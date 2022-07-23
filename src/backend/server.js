const express = require('express')
const config = require('./config')

config.connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/registry', require('./routes/registry'))
app.listen(config.env.port, () => console.log(`Server running on port ${config.env.port}`))
