const amqp = require('amqplib')

let connection, channel;


async function connectQueue(msg) {
    try {
        //console.log(msg)
        connection = await amqp.connect('amqp://localhost:5672')

        //console.log(connection)
        channel = await connection.createChannel()
        //console.log(channel)

        let queueName = await channel.assertQueue('psj')
        // let res = channel.sendToQueue('saif2', Buffer.from(msg.forEach(element => JSON.stringify(element))))
         for (let el of msg) {
            let res = channel.sendToQueue('psj', Buffer.from(JSON.stringify(msg)))
            console.log(`message sent successfuly to ${el.NAME}`)
            console.log(res);
        }



        // let sec= msg.split('.').length-1
        // console.log(sec)

        // setTimeout(()=>{
        //     connectQueue()
        // },1000)


        // let consume = await channel.consume('saif2', (res)=>{
        //     if(!res){
        //         console.log("Message has been rejected by server")
        //     }

        //     console.log(res.content.toString())
        // })
        //console.log(queueName)

        await channel.close()
        await connection.close()
        // connectQueue()


    } catch (err) {
        console.log(err)
    }
}

module.exports = { connectQueue }