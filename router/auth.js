const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res)=>{
    res.send("from router");
});

// router.post('/register', (req, res)=>{
//     const {name, email, phone, password, cpassword} = req.body; 
//     User.findOne({email:email})
//     .then((userExists)=>{
//         if(userExists){
//             return res.status(400).json({"message" : "user already exists"});
//         }
//         const user = new User({name, email, phone, password, cpassword});
//         user.save()
//             .then(()=>{
//                 return res.status(201).json({"message":"user created successfully"});
//             })
//             .catch((err)=>{
//                 return res.status(500).json({"Error" : err.message});
//             })
        
//     })
//     .catch((err)=>{
//         return res.status(500).json({"error" : err});
//     })

// })

// aysnc await approach

router.post('/register', async (req, res)=>{
    const {name, email, phone, password, cpassword} = req.body; 
    
    try{
        const userExists = await User.findOne({email:email});
        if(userExists){
            return res.status(400).json({"message" : "user already exists"});
        }
        const user = new User({name, email, phone, password, cpassword});
        await user.save();
        return res.status(201).json({"message":"user created successfully"});
    }
    catch(err){
        return res.status(500).json({"error" : err.message});
    }
});

module.exports = router;


