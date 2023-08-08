import express from 'express'
import { deleteUserById, getUser, getUserById, updateUserById } from '../db/user'

export const getAllUsers = async (req:express.Request , res:express.Response) =>{
    try {
        const users = await getUser();
        return res.status(200).json(users)
        
    } catch (error) {
        console.error(error);
        res.status(400).json({message:"Error finding all the users"})
    }
}



export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
    //   console.log(id)
    //   return res.sendStatus(200)
      const deletedUser = await deleteUserById(id);
  
      return res.json(deletedUser);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

export const updateUser = async (req:express.Request, res:express.Response) =>{
  try {
    const { id } = req.params;
    const {username} = req.body;
    const targetedUser = getUserById(id);
    if(!targetedUser){
      return res.status(404).json({message :"User not found"})
    }
    const updatedUser =await updateUserById(id,{username});
    console.log(updatedUser);
    res.status(200).json(updatedUser)
    
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
}

export const getAdmin = async (req:express.Request , res:express.Response)=>{
  
}