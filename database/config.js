const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://xenon:xenon123stack@cluster0.oowf7.mongodb.net/test",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("db connected successfully"))
.catch((e)=>console.log(e));