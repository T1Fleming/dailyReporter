
// https://expressjs.com/en/starter/hello-world.html

require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const core = require('./src/service')

app.get('/', (req, res) => {
    core.schedulePrintJob('After 3 seconds!', Date.now() + 10000)
    res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})