
// https://expressjs.com/en/starter/hello-world.html

require('dotenv').config()
const express = require('express')
const app = express()
const port = 8000
const core = require('./src/service')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/upload', (req, res) => {
  res.send('Hello World!')
})

app.get('/news', (req, res) => {
  resp = await core.newsData()
  res.send(resp)
})

app.get('/weather', (req, res) => {
  resp = await core.weatherData(37.55, -122.31)
  res.send(resp)
})


app.get('/submit', (req, res) => {
  core.schedulePrintJob('After 3 seconds!', Date.now() + 10000)
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})