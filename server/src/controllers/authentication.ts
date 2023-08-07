import {  createUser, getUserByEmail } from '../db/user';
import express from 'express';
import { authentication, random } from '../helpers/index';

export const register =async (req:express.Request,res:express.Response) => {
    console.log("In the register function")
    try {
        const {username,email ,password} = req.body;
        console.log({username,email,password})
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
        console.log("Creating User")
        res.status(200).json(user).end()

        
    } catch (error) {
        console.log(error);
        res.status(400).send("Something wrong with the register api .")
    }
}