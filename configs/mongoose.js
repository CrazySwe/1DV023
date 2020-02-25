/**
 * The configuration for a connection with mongoose to MongoDB.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const mongoose = require('mongoose')

const CONN_STRING = process.env.DB_CONNECTION_STRING
'mongodb+srv://snippetappuser:hVU9a5csR3RweE7w@snippet-app-master-uzt4l.gcp.mongodb.net/test?retryWrites=true&w=majority'


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
