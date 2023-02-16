    const userModel = require('./schema')
    const reciever = require('./reciever')
    const { MongoClient, Timestamp } = require('mongodb');

    //Validation for testing mobile Number and Email-id......................//......................
const regxValidator = function (val) {
    let regx = /^[6-9][0-9]{9}$/;
    return regx.test(val);
}

const isValidEmail = function(val) {
    let frd = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        return frd.test(val);
}





const final= (elem) => {
    const { NAME, MOBILE, EMAIL} = elem
    let obj ={}
    //let arr = [];
    
    if (MOBILE && EMAIL && NAME) {
        if (regxValidator(MOBILE) && isValidEmail(EMAIL)) {
            obj.MOBILE= MOBILE;
            obj.EMAIL= EMAIL;
            obj.NAME= NAME;
            return obj; 
           // arr.push(obj);
        }else{
            console.log('please enter valid mobile Number, email-id')
        }
    }else{
        console.log('name, email and mobile are mandatory to provide')
    }

   // if(Object.keys(obj).length >0) return obj
    // return arr

}


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name

async function main(data) {
    console.log('111111----------------',data);
    const dbName = 'myProject';
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('assignment1');
  console.log("........on db");
  collection.insertMany(data)
  collection.find({}).toArray().then((ans) =>{
    console.log(ans);
  }).catch((err) => {
    console.log(err.Message);
  });

  // the following code examples can be pasted here...
  return 'done.';
}



module.exports = { final,main};