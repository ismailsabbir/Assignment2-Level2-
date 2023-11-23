import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoute } from './app/modules/user/user.route';
const app: Application = express();
app.use(express.json());
app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello typescript mongoose server !');
});
app.post('/POST/api/users', userRoute);
app.get('/GET/api/users', userRoute);
app.get('/GET/api/users/:userId', userRoute);
app.put('/PUT/api/users/:userId', userRoute);
app.delete(`/DELETE/api/users/:userId`,userRoute);
app.put(`/api/users/:userId/orders`,userRoute);
app.get(`/api/users/:userId/orders`,userRoute);


export default app;
