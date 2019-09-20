const moment = require('moment');

function echoTimeRequestValidator (req, res, next) {
    const time = req.body.time;
    const message = req.body.message;

    if (!time
        || 'number' !== typeof time
        || !moment(time).isValid()
        || moment().isAfter(moment(time))
    ) {
        return res.status(401).end('invalid time. the time fields needs to be in milliseconds from 1970');
    }

    if (!message) {
        return res.status(401).end('invalid message.');
    }

    return next();
}

exports.echoTimeRequestValidator = echoTimeRequestValidator;