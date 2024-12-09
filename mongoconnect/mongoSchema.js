const mongoose=require("mongoose");

const newSchema=new mongoose.Schema({
    fname:String,
    lname:String,
    phone:Number
});

const Employee=new mongoose.model("Employee",newSchema);

module.exports=Employee;