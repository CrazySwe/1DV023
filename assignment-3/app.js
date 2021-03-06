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
const helmet = require('helmet')
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

// Express settings and middleware
app.use(helmet())
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"]
  }
}))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Handle session
const sessionMiddleware = session({
  name: 'IssueLister',
  secret: 'lmIKEWU5PUH4*5rH2O7vvTAcGVc1CCjpEq$2',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: 'lax'
  }
})
app.use(sessionMiddleware)

// Register Routes
require('./routes/routes.js')(app)

// Handle 404?
app.use('*', (req, res, next) => { res.status(404).send('Not found.') })

// Last resort error

app.use((err, req, res, next) => {
  console.dir(err)
  switch (err.status) {
    case 404:
      return res.status(404).send('404')
  }
  res.type('text/plain')
  res.status(500).send('Error 500 - Internal Server Error.')
})
// Start the web server.
const server = require('http').createServer(app)

server.listen(app.get('port'), app.get('host'), () => {
  console.log('Server started on http://' + app.get('host') + ':' + app.get('port'))
})

// Websocket.
const io = require('socket.io')(server, {
  // Socket.io settings?
})

io.use(function (socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next)
})

app.set('socketio', io)
io.on('connection', function (socket) {
  // join the project room.
  socket.join(socket.request.session.chosenproject)
})
