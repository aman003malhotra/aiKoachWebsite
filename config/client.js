const { default: axios } = require("axios");
const edjsParser = require("editorjs-parser");
// const EDITOR_JS_TOOLS = require('../config/editor/constant')
require('dotenv').config()

const Client = axios.create({
    baseURL: process.env.APP_URL,
    timeout: 10000,
    headers: {
        'Content-type': 'application/json',
        // "Authorization": 'Bearer ' + localStorage.getItem('token')
    }
});

Client.interceptors.request.use((config) => {
    // Set loading state to true before sending the request
    // if (loadingOverlay) loadingOverlay.style.display = 'flex';
    return config;
}, (error) => {
    // Handle request error
    // if (loadingOverlay) loadingOverlay.style.display = 'none';
    return Promise.reject(error);
});

Client.interceptors.response.use((response) => {
    // Set loading state to false after receiving the response
    // if (loadingOverlay) loadingOverlay.style.display = 'none';
    return response;
}, (error) => {
    // Handle response error
    // if (loadingOverlay) loadingOverlay.style.display = 'none';
    return Promise.reject(error);
});


function getTimeAgo(timestamp) {
    const currentTime = new Date();
    const previousTime = new Date(timestamp);
    const timeDifference = currentTime - previousTime;

    const minute = 60 * 1000; // milliseconds in a minute
    const hour = 60 * minute; // milliseconds in an hour
    const day = 24 * hour; // milliseconds in a day
    const month = 30 * day; // milliseconds in a month
    const year = 365 * day; // milliseconds in a year

    if (timeDifference < minute) {
        return 'Just now';
    } else if (timeDifference < hour) {
        const minutesAgo = Math.floor(timeDifference / minute);
        return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
    } else if (timeDifference < day) {
        const hoursAgo = Math.floor(timeDifference / hour);
        return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
    } else if (timeDifference < month) {
        const daysAgo = Math.floor(timeDifference / day);
        return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
    } else if (timeDifference < year) {
        const monthsAgo = Math.floor(timeDifference / month);
        return `${monthsAgo} month${monthsAgo === 1 ? '' : 's'} ago`;
    } else {
        const yearsAgo = Math.floor(timeDifference / year);
        return `${yearsAgo} year${yearsAgo === 1 ? '' : 's'} ago`;
    }
}

const editorJsParse = (data) => {
    const parser = new edjsParser({
    });
    return parser.parse(data)
}


module.exports = {
    Client,
    getTimeAgo,
    editorJsParse
}