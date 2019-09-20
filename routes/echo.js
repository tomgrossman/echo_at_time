const express = require('express');
const moment = require('moment');

const middlewares = require('./../middlewares/middlewares');
const redisHelper = require('../helpers/queue');

const router = express.Router();

/**
 * @api {post} /echoAtTime
 * @apiVersion 1.0.0
 * @apiName echoAtTime
 * @apiDescription Set message to print at server console at a given time
 * @apiParam (Request body) {Number} time time to print the message. In unix milliesconds
 * @apiParam (Request body) {String} message message to print at the given time
 * @apiExample Request URL example:
 *  /echoAtTime
 * @apiParamExample {json} Request body example:
 *     {
 *      "time": 1568972199205,
 *      "message": "message to print"
 *     }
 **/
router.post(
    '/',
    middlewares.echoTimeRequestValidator,
    handleEchoTime
);

async function handleEchoTime (req, res) {
    const time = moment(req.body.time);
    const message = req.body.message;

    await redisHelper.setMessage(message, time);

    return res.end('success');
}

module.exports = router;