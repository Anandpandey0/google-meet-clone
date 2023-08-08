import express from 'express';
import { deleteUser, getAllUsers, updateUser } from '../controllers/user';
import { isAuthenticated } from '../middlewares/index';



export default (router:express.Router) =>{
    router.get('/users', isAuthenticated,  getAllUsers);
    router.delete('/users/:id', isAuthenticated, deleteUser);
    router.put('/users/:id',isAuthenticated, updateUser)
}