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

const app = express()

app.set('port', process.env.PORT || 8000)
app.set('view engine', 'hbs')

// View engine
app.engine('hbs', exphbs.express4({
  defaultLayout: path.join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  layoutsDir: path.join(__dirname, 'views', 'layouts')

}))

app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => { res.render('index') })

// Set the 404 error page
app.use((err, req, res, next) => {
  console.error(err)
  res.type('text/plain')
  res.status(404)
  res.send('This is error 404 - Page not found.')
})

// Set the 500 error page
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.type('text/plain')
  res.status(500)
  res.send('This is error 500 - Internal Server Error.')
})

// Start listening
app.listen(app.get('port'), () => {
  console.log('Started on port ' + app.get('port') + ', press CTRL+C to terminate.')
})
