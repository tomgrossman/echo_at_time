const moment = require('moment');
const Redis = require('ioredis');

const redis = new Redis('redis://localhost:4444');

exports.setMessage = async function (message, momentTime) {
    await redis.zadd([
        message,
        momentTime.valueOf(),
        momentTime.valueOf()
    ]);
};

async function printCurrentMessages () {
    const currentTime = moment().valueOf().toString();

    const messagesStream = await redis.scanStream();
    messagesStream.on('data', (resultKeys) => {
        for (const currMessage of resultKeys) {
            redis
                .multi()
                .zrangebyscore([currMessage, '0', currentTime])
                .zremrangebyscore([currMessage, '0', currentTime])
                .exec((err, replies) => {
                    const rangeResult = replies[0];
                    const membersResult = rangeResult[1];
                    if (0 < membersResult.length) {
                        //to support same message at the same time
                        const toPrint = membersResult
                            .filter(m => Boolean(m))
                            .map( () => currMessage).join('\n');
                        console.log(toPrint);
                    }
                }
            );
        }
    });

    messagesStream.on('end', () => {
        setTimeout(printCurrentMessages, 200)
    })
}

printCurrentMessages();