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
    origin:"https://frontend1-one-drab.vercel.app",
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

// var mailoption={ }
// function mailfun(msg){
//          mailoption={
//         from:"jaykitmaurya1907@gmail.com",
//         to:"jaykitmaurya19@gmail.com",
//         subject:"mongodb data",
//         text:msg
        
//     }
// }
    
    
app.use(express.json());
app.use(cors(coroption));

app.get("/",(req,res)=>{
    res.send(
        "welcome home page"
    );
    
});

// app.post("/sendmail",(req,res)=>{


//      mailfun(msg);
//      console.log(req.body.to +req.body.subject+ req.body.message)

//         transport.sendMail(mailoption,(err,data)=>{
//         if(err){
//             console.log("sending error");
//             console.log("error:"+err);
//         }
//         else{
           
//             console.log("successfuly send mail");
//         }
//     })

  
    
// });


// app.post("/insert",async (req,res)=>{

   
//     console.log(req.body);
//     const msg=req.body;

//     mailfun(msg);

//     const newUser=new User({
//        fname:req.body.fname,
//        lname:req.body.lname,
//        phone:req.body.phone
//     });

//     // await newUser.save().then(()=>{console.log("data saved successsfully....."); }).catch((err)=>{console.log("error saving data")});
//     await newUser.save().then(()=>{
//         transport.sendMail(mailoption,(err,data)=>{
//             if(err){
//                 console.log("sending error");
//                 console.log("error:"+err);
//             }
//             else{
               
//                 console.log("successfuly send mail");
//             }
//         })
//         console.log("data saved successfullyy...")}).catch((err)=>{console.log("error"+err)});
//         res.send(req.body);
  
// });

app.post("/insert", async (req, res) => {
    console.log(req.body);

    // Convert JSON data to string for the email body
    const jsonData = JSON.stringify(req.body, null, 2); // Beautify JSON with indentation

    // Prepare mail options with JSON data
    const mailOptions = {
        from: "jaykitmaurya1907@gmail.com",
        to: "jaykitmaurya19@gmail.com",
        subject: "MongoDB Data",
        text: `New user added:\n\n${jsonData}`, // Include JSON data in the email body
    };

    // Create a new user document
    const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone,
    });

    try {
        await newUser.save(); // Save user to MongoDB
        console.log("Data saved successfully");

        // Send the email
            transport.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.error("Error sending email:", err);
                return res.status(500).send("User saved, but email failed to send");
            }
            console.log("Email sent successfully");
            res.send("User saved and email sent successfully");

        });


    } catch (err) {
        console.error("Error saving data:", err);
        res.status(500).send("Failed to save user");
    }
});

port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`server running on ${port}`);
});
