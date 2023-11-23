"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const route = express_1.default.Router();
route.post('/api/users', user_controller_1.usercontroller.createuser);
route.get('/api/users', user_controller_1.usercontroller.getalluser);
route.get(`/api/users/:userId`, user_controller_1.usercontroller.getaUser);
route.put(`/api/users/:userId`, user_controller_1.usercontroller.updateaUser);
route.delete(`/api/users/:userId`, user_controller_1.usercontroller.delateaUser);
route.put(`/api/users/:userId/orders`, user_controller_1.usercontroller.addorder);
route.get(`/api/users/:userId/orders`, user_controller_1.usercontroller.getUserOrder);
route.get(`/api/users/:userId/orders/total-price`, user_controller_1.usercontroller.getUserOrderTotalPrice);
exports.userRoute = route;
