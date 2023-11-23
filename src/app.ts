import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoute } from './app/modules/user/user.route';
const app: Application = express();
app.use(express.json());
app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send('Hello typescript Developer1 !');
});
app.post('/api/users',userRoute);
app.get('/GET/api/users',userRoute);
export default app;
