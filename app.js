/**
 * Exam Assignment 3 in course 1DV023.
 * Real time issue application.
 *
 * @author Kevin Cederholm
 * @version 1.0.0
 */
'use strict'

const express = require('express')

const app = express()

require('dotenv').config()

app.set('host', process.env.HOST || 'localhost')
app.set('port', process.env.PORT || 8080)

// Register Routes
require('./routes/routes.js')(app)

// Start the web server.
app.listen(app.get('port'), app.get('host'), () => {
  console.log('Server started on http://' + app.get('host') + ':' + app.get('port'))
})
