import {  createUser, getUserByEmail } from 'db/user';
import express from 'express';
import { authentication, random } from 'helpers';

export const register =async (req:express.Request,res:express.Response) => {
    try {
        const {username,email ,password} = req.body;
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
        res.status(200).json(user).end()

        
    } catch (error) {
        console.error(error);
        res.status(400).send("Something wrong with the register api .")
    }
}