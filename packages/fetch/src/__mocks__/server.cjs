/* eslint-disable @typescript-eslint/no-require-imports */

const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))

app.get('/test', (req, res) => {
	res.send('Hello World')
})
app.get('/test-json', (req, res) => {
	res.json({ data: 'Hello World' })
})
app.get('/test-500', (req, res) => {
	res.status(500).send('Internal Server Error')
})
app.get('/test-500-json', (req, res) => {
	res.status(500).json({ message: 'Internal Server Error' })
})

app.listen(3000, (..._args) => {
	console.log('Listening on port 3000')
})
