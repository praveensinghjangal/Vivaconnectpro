//const { json } = require('body-parser');
const express = require('express');
const app = express();
app.use(express.json());
var fs =  require('fs');
var {parse} = require('csv-parse')
var sendMessage = require('./src/sender')

const { default: mongoose } = require('mongoose');

const multer = require('multer')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});


var upload = multer({ storage: storage }).single("file");

app.post("/image", (req, res) => {
  console.log(req.files)
  upload(req, res, (err) => {
    console.log(err)
    if (err) {
      res.status(400).send("Something went wrong!");
    }
    res.send(req.file);
  });
});

mongoose.connect("mongodb+srv://PraveenSinghJangal:Jangal77@cluster0.vgsmmgn.mongodb.net/MongoDB",{
    useNewUrlParser :true
})

.then( () => console.log("MongoDb is Connected"))
.catch( err => console.log(err))


var arr = [];




function randStr(length) {
  let strresult = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    strresult += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return strresult;
}

const randNum = (num) => {

  let result = "";
  for (let i = 0; i < num; i++) {
    const numresult = Math.floor(Math.random() * num)

    result += numresult
  }
  return result;
}


function rnd(length) {
  var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var string = '';
  for (var ii = 0; ii < length; ii++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }


  return string + '@domain.com';
}


for (let i = 0; i < 50; i++) {
  let demoObj = {};
  demoObj.Name = randStr(7);
  demoObj.Mobile = randNum(10);
  demoObj.Email = rnd(15);

  arr.push(demoObj);

}


const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: './upload/assignment.csv',
  header: [
    { id: 'Name', title: 'NAME' },
    { id: 'Mobile', title: 'MOBILE' },
    { id: 'Email', title: 'EMAIL' }
  ]
});

const records = arr;

csvWriter.writeRecords(records)       // returns a promise
  .then(() => {
    console.log('...Done');
  });




var parser = parse({ columns: true }, function (err, records) {
  sendMessage.connectQueue(records)
  // console.log(records);
});

fs.createReadStream('/home/praveen/Assignment1/upload/assignment.csv').pipe(parser);


app.listen(3001, () => {
  console.log('Started on port 3001');
});
