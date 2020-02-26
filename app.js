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

    maxAge: 1000 * 60 * 60 * 24
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
  next()
})

// Registers all the routes
require('./routes/routes.js')(app)

// Error Handling
app.get('/404', (req, res, next) => {
  // This should trigger a status 404.
  // Do i even need this?
  next()
})
app.get('/500', (req, res, next) => {
  // This should trigger a status 500.
  next(new Error('500-error-test'))
})

// Set the 404 error page
app.use((req, res, next) => {
  res.status(404)
  res.render('errors/404', { layout: false })
})

// Set the 500 error page
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.type('text/plain')
  res.status(500)
  res.send('Error 500 - Internal Server Error.')
})

// Start listening development
app.listen(app.get('port'), () => {
  console.log('Started on port ' + app.get('port') + ', press CTRL+C to terminate.')
})

// Production
https.createServer({
  key: fs.readFileSync('keys/server.key'),
  cert: fs.readFileSync('keys/server.cert')
}, app).listen(8443, () => {
  console.log('Started on port ' + 8443 + ', press CTRL+C to terminate.')
})
