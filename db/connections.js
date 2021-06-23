const mongoose = require('mongoose');


const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("db connected successfully");
})
.catch(err=>{
    console.log(err);
});