const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://jaykit1907:NLeC4KaUBDCFaPYh@cluster0.h1mdt.mongodb.net/jaykit1?retryWrites=true&w=majority&appName=Cluster0",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
.then(()=>{console.log("connected successfulllly.....")}).catch((err)=>{console.log("error")});

