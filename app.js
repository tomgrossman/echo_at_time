const express = require('express');

const echoRouter = require('./routes/echo');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/echoAtTime', echoRouter);

app.listen(3000, () => {
    console.log('listening on port 3000');
});

module.exports = app;