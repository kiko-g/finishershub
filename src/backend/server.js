const express = require('express')
const config = require('./config')

const home = require('./routes/home')
const registry = require('./routes/registry')

config.connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', home)
app.use('/registry', registry)
app.listen(config.env.port, () => console.log(`Server running on port ${config.env.port}`))
