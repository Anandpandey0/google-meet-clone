import {  createUser, getUserByEmail } from '../db/user';
import express from 'express';
import { authentication, random } from '../helpers/index';

export const login = async (req:express.Request , res: express.Response) =>{
    try {
        const {email , password} = req.body;
        if(!email || !password ){
            return res.status(400).send("Email or password field is not provided");
            
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if(!user){
            return res.status(400).send("User is not registered");
        }
        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password != expectedHash) {
            return res.sendStatus(403).send("Password is incorrect");
          }
      
          const salt = random();
          user.authentication.sessionToken = authentication(salt, user._id.toString());
      
          await user.save();
      
          res.cookie('Google-Meet-Auth', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
          console.log("User Logged in")
          return res.status(200).json(user).end();
    } catch (error) {
        console.error(error);
        res.status(400).send("Some error happended in login api")  
    }
}

export const register =async (req:express.Request,res:express.Response) => {
    // console.log("In the register function")
    try {
        const {username,email ,password} = req.body;
        // console.log({username,email,password})
        if(!username || !email || !password){
            res.status(400).send("All the fields are required");
            return;
        }
        const existingUser = await getUserByEmail(email);
        if(existingUser){
            res.status(400).send("User already registered with this mailid");
        }
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password : authentication(salt,password),
            }

        })
        res.status(200).json({
            message: "User is created",
            email: email,     
            username: username 
        });

        
    } catch (error) {
        console.log(error);
        res.status(400).send("Something wrong with the register api .")
    }
}