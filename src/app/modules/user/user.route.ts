import express from 'express';
import { usercontroller } from './user.controller';
const route = express.Router();
route.post('/POST/api/users', usercontroller.createuser);
route.get('/GET/api/users', usercontroller.getalluser);
route.get(`/GET/api/users/:userId`,usercontroller.getaUser)
export const userRoute = route;
