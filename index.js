const express=require("express");

const app=express();

app.get("/",(req,res)=>{
    res.send("hello from home page");
});
app.listen(5000,()=>{
    console.log('server running');
})