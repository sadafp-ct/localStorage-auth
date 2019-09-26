const path = require('path');
const express = require('express');

const app = express();

app.use('/details', (req, res, next) => {
    const date = new Date();
    const time = date.toLocaleTimeString();
    
    res.locals.time = time;
    next();
});

app.use('/details', (req, res) => {
    const time = res.locals.time;
    res.send(
        '<header>' +
            '<nav>' +
                '<a href="/home">Home</a> | ' +
                '<a href="/details">Details</a>' +
            '</nav>' +
        '</header>' +
        '<div style="text-align: center;">' +
            '<p>' +
                '<b>' + 'Current Time:' + '</b>' +
                '<br/>' + time +
            '</p>' +
        '</div>'
    );
});

app.use('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.listen(3000);