const  mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    NAME:{
        type:String,
        require:true,
        },

    MOBILE:{
        type:String,
        require:true 
    },
     EMAIL :{
        type:String,
    require: true
    },

    isDeleted:{
        type:Boolean,
        default:false },
},{timestamps:true});

module.exports=mongoose.model("User",userSchema)