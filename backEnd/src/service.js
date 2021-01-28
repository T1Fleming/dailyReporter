const axios = require('axios');
const fs = require('fs')
const csv = require('csv-parse');
const db_path = '../db/task_db.json'

// const parseCsv = async function () {
//     //  {
//     //     toDoTask: [ 'toDo', 'refinance car', 'clean kitchen' ],
//     //     workoutTask: [ 'workout', 'chest', 'triceps' ],
//     //     studyTask: [ 'study', 'design backend' ]
//     //   }

//     return new Promise((resolve, reject) => {
//         let toDoTask = []
//         let workoutTask = []
//         let studyTask = []

//         fs.createReadStream('input.csv')
//             .pipe(csv())
//             .on('data', (row) => {

//                 // Push Data
//                 row[0] != '' ? toDoTask.push(row[0]) : null
//                 row[1] != '' ? studyTask.push(row[1]) : null
//                 row[2] != '' ? workoutTask.push(row[2]) : null

//             })
//             .on('end', () => {
//                 console.log('CSV file successfully processed');
//                 resolve({
//                     "toDoTask": toDoTask,
//                     "workoutTask": workoutTask,
//                     "studyTask": studyTask
//                 })
//             });
//     })
// }

const addTask = function (req) {

    // Parse an input we deeply, deeply trust
    const inputTask = req.body
    const newToDo = inputTask.toDo || null
    const newStudyTask = inputTask.studyTask || null
    const newWorkoutTask = inputTask.workoutTask || null

    // Load "DB" ;)
    const task_db = require(db_path)
    console.log(task_db)

    // Form new "DB"
    let finalDb = {}
    if (newToDo || newStudyTask || newWorkoutTask) {
        if (newToDo) { finalDb.toDo = task_db.toDo.concat(newToDo) }
        if (newStudyTask) { finalDb.studyTask = task_db.studyTask.concat(newStudyTask) }
        if (newWorkoutTask) { finalDb.workoutTask = task_db.workoutTask.concat(newWorkoutTask) }

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
    addTask: addTask
}
