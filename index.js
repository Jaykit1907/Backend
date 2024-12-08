const express= require("express");
app=express();

app.get("/",(req,res)=>{
    res.send("how are you");
})

app.listen(4000,()=>{
    console.log(`server running on 4000`);
})