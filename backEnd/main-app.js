
// https://expressjs.com/en/starter/hello-world.html

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000
const core = require('./src/service')

async function main () {

    let resp = await core.generatePdfFromHtml()
    console.log(resp)

}

main()