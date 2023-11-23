import express from 'express';
import { usercontroller } from './user.controller';
const route = express.Router();
route.post('/POST/api/users', usercontroller.createuser);
route.get('/GET/api/users', usercontroller.getalluser);
route.get(`/GET/api/users/:userId`,usercontroller.getaUser)
route.put(`/PUT/api/users/:userId`,usercontroller.updateaUser)
route.delete(`/DELETE/api/users/:userId`,usercontroller.delateaUser)
route.put(`/api/users/:userId/orders`,usercontroller.addorder)

export const userRoute = route;
