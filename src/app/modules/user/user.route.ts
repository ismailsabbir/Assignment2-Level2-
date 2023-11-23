import express from 'express';
import { usercontroller } from './user.controller';
const route = express.Router();
route.post('/api/users', usercontroller.createuser);
route.get('/GET/api/users',usercontroller.getalluser)
export const userRoute = route;
