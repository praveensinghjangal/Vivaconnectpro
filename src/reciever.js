const amqp = require('amqplib')
var valid = require('./controller.js')

let connection, channel;
// setInterval(()=>{
//     consumeMessage()
// }, 2000)



async function consumeMessage() {
    try {
        connection = await amqp.connect('amqp://localhost:5672')

        channel = await connection.createChannel()
        let result = await channel.assertQueue('psj')
        let msg = await channel.consume('psj', (res) => {
            //console.log(res)
            if (!res) {
                console.log("Message has been cancelled by server ")
            }
            let inpu = JSON.parse(res.content.toString());
             console.log(inpu)

             //let arr = [];
            //  let newarr = arr.push(inpu);
            //   console.log(newarr);

              //console.log(inpu)
            valid.final(inpu);

            channel.ack(res)
            //console.log(res.content.toString())
            // console.log(inpu)

        })
        
        await channel.close()
        await connection.close()


    } catch (err) {
        console.log(err)
    }
}
consumeMessage()