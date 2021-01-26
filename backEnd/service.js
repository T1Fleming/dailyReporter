const axios = require('axios');
const fs = require('fs')
const csv = require('csv-parse');
require('dotenv').config()

const parseCsv = async function () {
    //  {
    //     toDoTask: [ 'toDo', 'refinance car', 'clean kitchen' ],
    //     workoutTask: [ 'workout', 'chest', 'triceps' ],
    //     studyTask: [ 'study', 'design backend' ]
    //   }

    return new Promise((resolve, reject) => {
        let toDoTask = []
        let workoutTask = []
        let studyTask = []

        fs.createReadStream('input.csv')
            .pipe(csv())
            .on('data', (row) => {

                // Push Data
                row[0] != '' ? toDoTask.push(row[0]) : null
                row[1] != '' ? studyTask.push(row[1]) : null
                row[2] != '' ? workoutTask.push(row[2]) : null

            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                resolve({
                    "toDoTask": toDoTask,
                    "workoutTask": workoutTask,
                    "studyTask": studyTask
                })
            });
    })
}

const news = async function () {
    url = 'http://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        `apiKey=${process.env.NEWS_API_KEY}`;
    return axios.get(url)
}

const commonWorkBar = function () {

}

const toDo = function () {

}

const weather = function () {

}

const workOuts = function () {

}

const advice = function () {

}

const musicOfTheDay = function () {

}

const studyPlan = function () {

}

const calendar = function () {

}


async function main() {
    // let resp = await news()
    // console.log(resp.data)

    resp = await parseCsv()
    console.log(resp)

}

main()

