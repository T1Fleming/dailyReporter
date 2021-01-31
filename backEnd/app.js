
// https://expressjs.com/en/starter/hello-world.html

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000
const core = require('./src/service')

app.use(bodyParser.json())

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/upload', (req, res) => {
  try {
    resp = core.addTask(req)
    res.send(resp)
  } catch {
    res.send('No Data')
  }
})

app.get('/news', async (req, res) => {
  try {
    resp = await core.newsData()
    res.send(resp.data)
  } catch {
    res.send('No Data')
  }
})

app.get('/weather', async (req, res) => {
  try {
    resp = await core.weatherData(37.55, -122.31)
    res.send(resp.data)
  } catch {
    res.send('No Data')
  }
})

app.get('/advice', async (req, res) => {
  try {
    resp = await core.adviceData()
    res.send(resp.data)
  } catch {
    res.send('No Data')
  }
})


app.post('/submit', (req, res) => {
  try {
    core.generateAndSendReport(Date.now() + 20000)
    res.send('Submitted!')
  }
  catch {
    res.send('No Data')
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})