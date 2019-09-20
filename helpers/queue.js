const moment = require('moment');
const Queue = require('bull');

const messageQueue = new Queue('messages subscription', 'redis://redis-server:6379');

exports.setMessage = function (message, momentTime) {
    const delay = momentTime.valueOf() - moment().valueOf();
    //using the delay option to get the messages on time

    messageQueue.add('print', message, { delay: delay });
};

messageQueue.process('print', (job, done) => {
    console.log(job.data);
    job.delete();
    done();
});