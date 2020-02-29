/**
 * Exam Assignment 2 in course 1DV023.
 * Code Snippet Application.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const express = require('express')
const exphbs = require('express-hbs')
const path = require('path')
const session = require('express-session')
const helmet = require('helmet')
const logger = require('morgan')
const createError = require('http-errors')

const https = require('https')
const fs = require('fs')

const mongoose = require('./configs/mongoose')

const app = express()
app.use(helmet())

// Open the mongoose connection async
mongoose.connect().catch(error => {
  console.error(error)
  process.exit(0)
})

app.set('port', process.env.PORT || 8080)

// View engine
app.engine('hbs', exphbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  layoutsDir: path.join(__dirname, 'views', 'layouts')

}))
app.set('view engine', 'hbs')

// Middleware
app.use(logger('tiny'))
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'unpkg.com']
  }
}))
app.use(express.urlencoded({ extended: false }))
app.use('/static', express.static(path.join(__dirname, 'public')))

// Session Middleware
app.use(session({
  name: 'MySnippetPage',
  secret: 'zL7L787wKiH7Noxhu6kI',
  resave: false,
  saveUninitialized: false,
  cookie: {
    // secure: true, // Only in https
    // httpOnly: true
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: 'lax'
  }
}))

app.use((req, res, next) => {
  // session for templates usage (dynamic menu)
  res.locals.session = req.session
  // Flash-alert middleware - survives only a round trip
  if (req.session.flash) {
    res.locals.flash = req.session.flash
    delete req.session.flash
  }
  req.session.flash = []
  next()
})

// Registers all the routes
require('./routes/routes.js')(app)
// And 404 if route is not found.
app.use('*', (req, res, next) => next(createError(404, 'Page not found.')))

// Set the 500 error page
app.use((err, req, res, next) => {
  switch (err.status) {
    case 404:
      return res.status(404).send('404: ' + err.message)

    case 403:
      return res.status(403).send('403: ' + err.message)
  }

  res.type('text/plain')
  res.status(500).send('Error 500 - Internal Server Error.')
})

// Start listening development
app.listen(app.get('port'), () => {
  console.log('HTTP Started on port ' + app.get('port') + ', press CTRL+C to terminate.')
})

// Production
https.createServer({
  key: fs.readFileSync('keys/server.key'),
  cert: fs.readFileSync('keys/server.cert')
}, app).listen(8443, () => {
  console.log('HTTPS Started on port ' + 8443 + ', press CTRL+C to terminate.')
})
