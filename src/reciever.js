const amqp = require('amqplib')
var valid = require('./controller.js');
const { collection } = require('./schema.js');


let connection, channel;
// setInterval(()=>{
//     consumeMessage()
// }, 2000)



async function consumeMessage() {
    try {
        connection = await amqp.connect('amqp://localhost:5672')

        channel = await connection.createChannel()
        let result = await channel.assertQueue('psj',{durable:true})
        let msg = await channel.consume('psj', (res) => {
            //console.log(res)
            if (!res) {
                console.log("Message has been cancelled by server ")
            }
            let won
            let inpu = JSON.parse(res.content.toString());
            console.log("---------", inpu);
            for(let ele of inpu){
                console.log("____ele------> ", ele);
               won = valid.final(ele)
            
                //return res;
                console.log('.......result', won);



                //valid.main(arr)
            }

            
           valid.main(won);
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