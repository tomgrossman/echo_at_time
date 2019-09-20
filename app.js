const express = require('express');

const echoRouter = require('./routes/echo');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/echoAtTime', echoRouter);

app.listen(1337, () => {
    console.log('listening on port 1337');
});

module.exports = app;