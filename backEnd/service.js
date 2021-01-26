const axios = require('axios');
require('dotenv').config()

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
    let resp = await news()
    console.log(resp.data)
}

main()

