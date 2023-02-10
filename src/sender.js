const amqp = require('amqplib')

//let connection, channel;


async function connectQueue(msg) {
    try {
        //console.log(msg)
        let connection = await amqp.connect('amqp://localhost:5672')

        //console.log(connection)
        let channel = await connection.createChannel()
        //console.log(channel)

        let queueName = await channel.assertQueue('psj')
        let res = channel.sendToQueue('psj', Buffer.from(JSON.stringify(msg)))
            //console.log(`message sent successfuly to ${el.NAME}`)
            console.log('Message sent ok.....',res);
        

        await channel.close()
        await connection.close()
        // connectQueue()


    } catch (err) {
        console.log(err)
    }
}

module.exports = { connectQueue }