const express=require("express");
const nodeMailer=require("nodemailer");
const bodyparser=require("body-parser")
const mongoose=require("./mongoconnect/model");
const User=require("./mongoconnect/mongoSchema");
require("dotenv").config();
const cors=require("cors")
require("dotenv").config();
const app=express();
const coroption={
    origin:"http://localhost:3000",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,

}



const transport= nodeMailer.createTransport({
    host:"smtp.gmail.com",
    auth:{
        user:"jaykitmaurya1907@gmail.com",
        pass:process.env.EMAIL_PASS
    }
})

var mailoption={ }
function mailfun(to,sub,msg){
         mailoption={
        from:"jaykitmaurya1907@gmail.com",
        to:to,
        subject:sub,
        text:msg
        
    }
}
    
    
app.use(express.json());
app.use(cors(coroption));

app.get("/",(req,res)=>{
    res.send(
        "welcome home page"
    );
    
});

app.post("/sendmail",(req,res)=>{


     mailfun( req.body.to , req.body.subject, req.body.message);
     console.log(req.body.to +req.body.subject+ req.body.message)

        transport.sendMail(mailoption,(err,data)=>{
        if(err){
            console.log("sending error");
            console.log("error:"+err);
        }
        else{
           
            console.log("successfuly send mail");
        }
    })

  
    
});


app.post("/insert",async (req,res)=>{

   
    console.log(req.body);
    const newUser=new User({
       fname:req.body.fname,
       lname:req.body.lname,
       phone:req.body.phone
    });

    await newUser.save().then(() =>{console.log("data saved successsfully.....");  res.send("saved successfully...");}).catch((err)=>{console.log("error saving data")});

  
});


port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`server running on ${port}`);
});
