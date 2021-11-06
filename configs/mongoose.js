/**
 * The configuration for a connection with mongoose to MongoDB.
 * Taken from: https://github.com/1dv023/syllabus/blob/master/lectures/03/demo/configs/mongoose.js.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const mongoose = require('mongoose')

// This CONN_STRING is just for this assignment.
const CONN_STRING = process.env.DB_CONNECTION_STRING


module.exports.connect = async () => {
  mongoose.connection.on('connected', () => console.log('Mongoose connection is open.'))
  mongoose.connection.on('error', (error) => console.error(`Mongoose connection error: ${error}`))
  mongoose.connection.on('disconnected', () => console.log('Mongoose connection is disconnected.'))

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection is disconnected due to application termination.')
      process.exit(0)
    })
  })

  return mongoose.connect(CONN_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
