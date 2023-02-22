const express=require('express')
const User=require('../models/User')
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')

//ROUTE:1 endpoind to createuser API:/api/auth/createuser

router.post('/createuser',[                                 //arrays of test validation
    body('name','Password must be 5 characters').isLength({ min: 5 }),
    body('email','Enter a Valis email').isEmail(),
    body('password','Password must be 5 characters').isLength({ min: 5 }),
],async(req,res)=>{
  try{
    //success variable to show success
    let success=false

    //validating user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // chaecking existance of email using findOne function in DB
    let user=await User.findOne({email : req.body.email})
    if(user){
     return res.status(400).json({error: "Sorry an user with this email exists"})
    }

    //hasing salted password using bcrypjs
    const salt = await bcrypt.genSalt(10)
    const secpass=await bcrypt.hash(req.body.password,salt)

    //creating user after validation storing in DB
    user=await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secpass,
    })

    //sending authentication token to user using JWT package
    const JWT_seceret="iamnew"      //secret key
    const data={                   //data obj containing id to be send
      user:{
        id:user.id
      }
    }
    success=true
    const authenticetion=jwt.sign(data,JWT_seceret); 
    res.json({success,authenticetion})

  }catch(err){
    console.log(err.message)
    res.status(500).json({error:"Internal Server Error"})
  }
    // console.log(req.body);
    // const user=User(req.body);
    // await user.save();                                //if not using express validation
    // res.send(req.body);

})


//ROUTE2:  endpoint to login a user /api/auth/login 

router.post('/login',[  
    body('email').isEmail(),
    body('password').exists(),
],async(req,res)=>{
  try {
    //success variable to show success
    let success=false

    let user=await User.findOne({email : req.body.email})
    if(!user){
     return res.status(400).json({error: "Please try to login with correct credentials"})
    }

    //user password verification
    const comparepassword = await bcrypt.compare(req.body.password,user.password)
    if(!comparepassword){
      return res.status(400).json({error: "Please try to login with correct credentials"})
    }

//sending authentication token to user using JWT package
    const JWT_seceret="iamnew"      //secret key
    const data={                   //data obj containing id to be send
      user:{
        id:user.id
      }
    }
    const authenticetion=jwt.sign(data,JWT_seceret); 
    success=true
    res.json({success,authenticetion})


    
  } catch (err) {
    console.log(err.message)
    res.status(500).json({error:"Internal Server Error"})
    
  }
})

//ROUTE3:  endpoint to getuser a user /api/auth/getuser 

router.post('/getuser',fetchuser,async(req,res)=>{
  try {
    //success variable to show success
    let success=false

    const userid=req.user.id
    console.log(userid)
    const user=await User.findById(userid).select("-password")
    success=true
    res.send(user)
    
  } catch (error) {
    console.log(error.message)
    res.status(500).json({error:"Internal Server Error"})
    
  }
})

module.exports=router