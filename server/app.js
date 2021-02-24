const cookieParser = require('cookie-parser')
const express = require('express')
const logger = require('morgan')
const path = require('path')
const dotenv = require('dotenv')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const mongoose = require('mongoose')
dotenv.config()

const indexRouter = require('./routes/index')
const schema = require('./schema/schema')

const app = express()
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const dbConnection = mongoose.connection
dbConnection.on('error', e => console.log(`Connection error: ${e}`))
dbConnection.on('open', () => console.log('Connected to DB'))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

module.exports = app
