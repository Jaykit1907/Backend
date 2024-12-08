const express= require("express");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const nodemailer=require("nodemailer");
require("dotenv").config();
app=express()
app.set("view engine","ejs");
app.set("views","views");
app.use(bodyparser.urlencoded())
app.use(express.static("views"))
//mongoose.connect("mongodb+srv://jaykit1907:JPtivi181923 @cluster0.h1mdt.mongodb.net/jaykit5?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log("connected successfully....")).catch((err)=>console.log(err));



var transport=nodemailer.createTransport({
    host:"smtp.gmail.com",
    auth:{
        user:"jaykitmaurya1907@gmail.com",
        pass:process.env.EMAIL_PASS
    }
});


app.get("/",(req,res)=>{
    res.render("index.ejs");
})
app.post("/",(req,res)=>{
    const email=req.body.email
    const sub=req.body.sub
    const msg=req.body.msg
    var mailoption={
        from:"jaykitmaurya19@gmail.com",
        to:email,
        sub:sub,
        text:msg
    };
    transport.sendMail(mailoption,(err,info)=>{
        if(err){
            console.log("error occured");
        }
        else{
        
                console.log("send successfully....");
                res.render("index.ejs");

        }

        

});
});

app.get("/user",(req,res)=>{
    res.json({
        "phone":256944555
    });
})

app.listen(process.env.PORT,()=>{
    console.log(`server running on ${process.env.PORT}`);
})