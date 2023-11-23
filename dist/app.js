"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Hello typescript mongoose server !');
});
app.post('/POST/api/users', user_route_1.userRoute);
app.get('/GET/api/users', user_route_1.userRoute);
app.get('/GET/api/users/:userId', user_route_1.userRoute);
app.put('/PUT/api/users/:userId', user_route_1.userRoute);
app.delete(`/DELETE/api/users/:userId`, user_route_1.userRoute);
app.put(`/api/users/:userId/orders`, user_route_1.userRoute);
app.get(`/api/users/:userId/orders`, user_route_1.userRoute);
app.get(`/api/users/:userId/orders/total-price`, user_route_1.userRoute);
exports.default = app;
