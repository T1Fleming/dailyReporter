const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');
const { stdout, stderr, stdin } = require('process');
// const db_path = '../db/task_db.json' // Relative to file
const db_path = './db/task_db.json'// Relative to executor

const generatePdfFromHtml = async function () {
    return new Promise((resolve, reject) => {
        // Use chrome in headless mode to grab url and generate pdf
        const cmdStr = `start ${process.env.PATH_TO_CHROME} --headless --print-to-pdf="${process.env.OUTPUT_PDF_PATH}" https://${process.env.STATIC_FRONTEND_BASE_URL}`
        console.log(cmdStr)
        exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
                reject(error)
            }
            console.log('finished: ', stdout)
            resolve(stdout)
        })
    })
}

const addTask = function (req) {

    // Parse an input we deeply, deeply trust
    const inputTask = req.body
    const newToDo = inputTask.toDo || null
    const newStudyTask = inputTask.studyTask || null
    const newWorkoutTask = inputTask.workoutTask || null

    // Load "DB" ;)
    const task_db = JSON.parse(fs.readFileSync(db_path, 'utf-8'))

    // Form new "DB"
    let finalDb = {
        "toDo": task_db.toDo,
        "studyTask": task_db.studyTask,
        "workoutTask": task_db.workoutTask
    }

    if (newToDo || newStudyTask || newWorkoutTask) {
        if (newToDo) { finalDb.toDo = finalDb.toDo.concat(newToDo) }
        if (newStudyTask) { finalDb.studyTask = finalDb.studyTask.concat(newStudyTask) }
        if (newWorkoutTask) { finalDb.workoutTask = finalDb.workoutTask.concat(newWorkoutTask) }

        // Write to new "DB"
        fs.writeFileSync('./db/task_db.json', JSON.stringify(finalDb))
        return 'Wrote to file'
    } else {
        return 'No changes'
    }
}

const newsData = async function () {
    let url = `https://${process.env.NEWS_API_URL}/` + 'top-headlines?' +
        'country=us&' +
        `apiKey=${process.env.NEWS_API_KEY}`;
    return axios.get(url)
}


const weatherData = async function (lat, lon) {
    // 37.55 -122.31
    let url = `https://${process.env.WEATHER_API_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`
    console.log(url)
    return axios.get(url)
}

const adviceData = async function () {
    return axios.get(`https://${process.env.ADVICE_API_URL}/advice`)
}

const schedulePrintJob = async function (inString, dateToExecuteInEpoch) {
    const timeUntilExexcute = dateToExecuteInEpoch - Date.now()
    if (timeUntilExexcute < 0) {
        return 'Invalid Time'
    }
    if (timeUntilExexcute > 2.592 * (10 ** 8)) {
        return 'To long!'
    }
    return setTimeout(function () {
        axios.post(`${process.env.PRINTER_URL}/printer/print`, {
            firstName: 'Fred',
            lastName: 'Flintstone'
        })
    }, timeUntilExexcute)
}

const commonWorkBar = function () {
    // Maybe WIP
}

const musicOfTheDay = function () {
    // WIP
}

const calendar = function () {
    // WIP
}

module.exports = {
    newsData: newsData,
    weatherData: weatherData,
    schedulePrintJob: schedulePrintJob,
    adviceData: adviceData,
    addTask: addTask,
    generatePdfFromHtml: generatePdfFromHtml
}
