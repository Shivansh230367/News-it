const mongoose = require("mongoose");
const ConnectDB = async (url)=>{
    try{
        await mongoose.connect(url);
        console.log("DB connected");
    }catch(err){
        console.log(err);
    }    
};
module.exports = ConnectDB;