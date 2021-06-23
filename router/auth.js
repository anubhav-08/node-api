const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


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
        }else if(password != cpassword)
        {
            return res.status(400).json({"message": "password and confirm password are not same"});
        }
        const user = new User({name, email, phone, password, cpassword});

        await user.save();
        return res.status(201).json({"message":"user created successfully"});
    }
    catch(err){
        return res.status(500).json({"error" : err.message});
    }
});


router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password)
    {
        return res.json({"message" : "please fill your details"});
    }

    try {
        const userExists = await User.findOne({email:email});
        if(userExists)
        {   
            const isMatch = await bcrypt.compare(password, userExists.password);
            if(isMatch){
                res.json({"message":"loggedin successfully"});
            }else
            {
                return res.status(400).json({"message" : "invalid credentials"});
            }
        }else
        {
            return res.status(400).json({"message" : "invalid credentials"});
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({"message" : "invalid credentials"});
    }
});



module.exports = router;


