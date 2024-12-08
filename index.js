const express= require("express");
app=express();

app.get("/",(req,res)=>{
    res.send("how are you");
})

app.get("/user",(req,res)=>{
    res.json({
        "name":"jaykit",
        "phone":256944555
    });
})

app.listen(4000,()=>{
    console.log(`server running on 4000`);
})