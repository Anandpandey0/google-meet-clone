import express from 'express';

import {  login, register } from '../controllers/authentication';
// import { getUser } from 'db/user';

export default (router: express.Router) => {
  router.post('/auth/register', register);
  router.post('/auth/login',login);
 

};