const moment = require('moment');
const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient('redis://redis-server:6379');
const keysAsync = promisify(client.keys).bind(client);
const zaddAsync = promisify(client.zadd).bind(client);

exports.setMessage = async function (message, momentTime) {
    await zaddAsync([
        message,
        momentTime.valueOf(),
        momentTime.valueOf()
    ]);
};

async function printCurrentMessages () {
    const currentTime = moment().valueOf().toString();

    const messages = await keysAsync('*');
    //it's ok to iterate over messages, since if another server already took them, the zrangebyscore will return nothing

    for (const currMessage of messages) {
        const multi = client.multi();
        multi.zrangebyscore([currMessage, '0', currentTime]);
        multi.zremrangebyscore([currMessage, '0', currentTime]);
        multi.exec((err, replies) => {
            const rangeResult = replies[0];
            if (0 < rangeResult.length) {
                //to support same message at the same time
                const toPrint = rangeResult.map( () => currMessage).join('\m');
                console.log(toPrint);
            }
        });
    }
}

setInterval(printCurrentMessages, 100);