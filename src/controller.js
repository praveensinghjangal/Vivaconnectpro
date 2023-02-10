    const userModel = require('./schema')
    const reciever = require('./reciever')
    const { MongoClient } = require('mongodb');

    
const regxValidator = function (val) {
    let regx = /^[6-9][0-9]{9}$/;
    return regx.test(val);
}

const isValidEmail = function(val) {
    let frd = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        return frd.test(val);
}


// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// // Database Name

// async function main(data) {
//     const dbName = 'myProject';
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log('Connected successfully to server');
//   const db = client.db(dbName);
//   const collection = db.collection('assignment1');
//   collection.insertMany()

//   // the following code examples can be pasted here...
//   return 'done.';
// }



const final= (elem) => {
    const { NAME, MOBILE, EMAIL} = elem
    let obj ={}
    let arr = [];
    
    if (MOBILE && EMAIL && NAME) {
        if (regxValidator(MOBILE) && isValidEmail(EMAIL)) {
            obj.MOBILE= MOBILE;
            obj.EMAIL= EMAIL;
            obj.NAME= NAME;
            arr.push(obj);
        }else{
            console.log('please enter valid mobile Number, email-id')
        }
    }else{
        console.log('name, email and mobile are mandatory to provide')
    }

    return arr

}


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name

async function main(data) {
    const dbName = 'myProject';
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('assignment1');
  collection.insertMany(data)

  // the following code examples can be pasted here...
  return 'done.';
}
// arr.push(obj);

// let final = async function (req, res){
//    try {
   
//     const { NAME, MOBILE, EMAIL,...rest } = req
//    if(!rest)res.send({ status: false, message: "No others key is allowed" }) 


//    if(!MOBILE){ return res.send({ status:false, message: "mobile number is mandatory"})}
//    if (!regxValidator(MOBILE))return  res.send({ status: false, message: "please enter valid phonenumber" })
//    if(!NAME){ return res.send({ status:false, message: "Name is mandatory"})}
//    if(!EMAIL){ return res.send({ status:false, message: "Email is mandatory"})}
//    if (!isValidEmail(EMAIL))return  res.send({ status: false, message: "please enter valid emailid" });


//    const uniqueemail = await userModel.findOne({EMAIL:EMAIL})
//    if (uniqueemail) return res.status(400).send({ status: false, message: "emailId already exist" })
   
// let wecan = {
//     NAME: NAME,
//     MOBILE: MOBILE,
//     EMAIL: EMAIL
// }

//console.log(wecan);


//    const result = await userModel.create(wecan)
//    console.log(result);
// }
//    catch (err) {
//     //res.status(500).send({ status: false, error: err.message });
//     console.log(err)
//    }   
// }



module.exports = { final,main};