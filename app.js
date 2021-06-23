const express = require('express');
// const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path : './.env'});
const router = require('./router/auth');
const port = process.env.PORT || 3000;
const app = express();
require('./db/connections');


// added a router file
app.use(express.json());
app.use(router);

const middleware = (req, res, next)=>{
    console.log("welcome to middleware");
    next();
}

app.listen(port, ()=>{
    console.log(`server is running at port number ${port}`);
});