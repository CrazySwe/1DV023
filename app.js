/**
 * Exam Assignment 3 in course 1DV023.
 * Real time issue application.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const path = require('path')
const express = require('express')
const exphbs = require('express-hbs')
const session = require('express-session')
const app = express()

require('dotenv').config()

app.set('host', process.env.HOST || 'localhost')
app.set('port', process.env.PORT || 8080)

// View engine
app.engine('hbs', exphbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  layoutsDir: path.join(__dirname, 'views', 'layouts')
}))
app.set('view engine', 'hbs')

// Express settings and built-in middleware
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

// Handle session
app.use(session({
  name: 'IssueLister',
  secret: 'lmIKEWU5PUH4*5rH2O7vvTAcGVc1CCjpEq$2',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: 'lax'
  }
}))

// Register Routes
require('./routes/routes.js')(app)

// Handle 404?
app.use('*', (req, res, next) => { res.status(404).send('Not found.') })

// Start the web server.
const server = require('http').createServer(app)

server.listen(app.get('port'), app.get('host'), () => {
  console.log('Server started on http://' + app.get('host') + ':' + app.get('port'))
})

// Websocket.
const io = require('socket.io')(server, {
  // Socket.io settings.
})

io.on('connection', function (socket) {
  console.dir('Client connected on websocket ID: ' + socket.id + ' session?:' + socket.handshake.headers.cookie)

  // console.dir(socket.handshake.cookie)
})
