    const userModel = require('./schema')
    const reciever = require('./reciever')
const regxValidator = function (val) {
    let regx = /^[6-9][0-9]{9}$/;
    return regx.test(val);
}

let final = async function (req, res){
   try {
   
    const { NAME, MOBILE, EMAIL,...rest } = req
   if(!rest)res.send({ status: false, message: "No others key is allowed" }) 


   if(!MOBILE){ return res.send({ status:false, message: "name is mandatory"})}
   if (!regxValidator(MOBILE))return  res.send({ status: false, message: "please enter valid phonenumber" })


let wecan = {
    NAME: NAME,
    MOBILE: MOBILE,
    EMAIL: EMAIL
}

console.log(wecan);
   const result = await userModel.create(wecan)
   res.send({ status: true, msg: "all data is created sucessfuly", result })
}
   catch (err) {
    //res.status(500).send({ status: false, error: err.message });
    console.log(err)
   }   
}

module.exports = {final}