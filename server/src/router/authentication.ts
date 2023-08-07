import express from 'express';

import {  register } from '../controllers/authentication';
// import { getUser } from 'db/user';

export default (router: express.Router) => {
  router.post('/auth/register', register);
 

};