import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/UserModel.js';
import Jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const router = express.Router();


router.post('/signup', async (req,res) => {
    
    const {username, email, password} = req.body; 
    const user = await User.findOne({email})
    
    if(user){
        return res.json({message:"User already existed"})
    }

    console.log("start");
    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashpassword,
    })

    await newUser.save()
    return res.json({status:true, message: "user registed"})
});

router.post('/login', async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email})
        if(!user){
            return res.json({message:"user is not registered"})
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return res.json({message : "Password is incorrect"})
        }

        const token = Jwt.sign({ username: user.username}, process.env.KEY, {expiresIn:'1h'})
        res.cookie('token', token, { httpOnly: true, maxAge: 360000})
        return res.json({status: true, message:"login successfully"})
});

router.post('/forgot-password', async (req,res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.json({ message: "user not registered"})
        }           

        const encodedtoken = Jwt.sign({ id: user._id}, process.env.KEY, {expiresIn:'5m'});

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'hamiduv0007@gmail.com',
            pass: 'fbdh edbd nswe voww'
          }
        });
        
        var mailOptions = {
          from: 'hamiduv0007@gmail.com',
          to: email,
          subject: 'Reset Password',
          text: `http://localhost:5173/resetPassword/${encodedtoken}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            return res.json({ message: "error..!"});
          } else {
            return res.json({ status: true, message: "email sent"});
          }
        });

        

    } catch (error) {
        console.log(error);
    }
});


router.post('/reset-password/:token', async (req,res) => {
    const {token} = req.params;
    const {password} = req.body
    try {
        const decoded = await Jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashPassword = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate({ _id: id}, { password: hashPassword})
        // console.log("success...! namma jayichitte maara");
        return res.json({ status: true, message: "Password updated"})
    } catch (error) {
        return res.json("invalid token")
    }
});

const verifyUser = async (req,res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
        return res.json({ status: false, message:"no token"})
    }
    const decoded = Jwt.verify(token, process.env.KEY);
    next()
    } catch (error) {
        return res.json(error)
    }
    

}

router.get('/verify',verifyUser, (req,res) => {
    return res.json({ status: true, message:"authorized"})
});

router.get('/logout', (req,res) => {
    res.clearCookie('token')
    return res.json({ status:true })
});



export {router as UserRouter}