const amqp = require('amqplib')
var valid = require('./controller.js');
const { collection } = require('./schema.js');
const constant=require('./constant')


let connection, channel;


async function consumeMessage() {
    try {
        connection = await amqp.connect('amqp://localhost:5672')

        channel = await connection.createChannel()
        let result = await channel.assertQueue(constant.constDta.queueName,{durable:true})
        let msg = await channel.consume(constant.constDta.queueName, (res) => {
            //console.log(res)
            if (!res) {
                console.log("Message hasn't recieved ")
            }
            let getDataAfterValidation
            let input = JSON.parse(res.content.toString());
            console.log("---------", input);
            let arr1 =[]
            for(let ele of input){
                console.log("____ele------> ", ele);
                ele.Timestamp = new Date()
               getDataAfterValidation = valid.final(ele)
            
                //return res;
                console.log('.......result', getDataAfterValidation);
                let n = 5;
                if(getDataAfterValidation){
                    arr1.push(getDataAfterValidation)
                    if(arr1.length == n){
                        console.log("arr len: ", arr1.length);
                        valid.main(arr1);
                        arr1= []
                    }
                }else{
                    continue;
                }


                
            }

           
        
        
            //channel.ack(res)
           
        },{noAck:true})
        
        await channel.close()
        await connection.close()


    } catch (err) {
        console.log(err)
    }
}
consumeMessage()