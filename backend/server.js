const express = require('express');
const app = express();
const mongoose = require("mongoose");

const dotenv = require("dotenv")
app.use(express.json());
app.use(require("./routes/router"));
dotenv.config({path:"./.env"});
const PORT = process.env.PORT || 5000 ;

//for connect MongoDB server
const Connect =async()=>{
    await mongoose.connect(process.env.URI).then(()=>{
        console.log("connected..");
    }).catch((err)=>{
        console.log(err);
    });
}     
Connect();

app.listen(PORT,()=>{
    console.log(`app is Listening on port no ${PORT}`);
})