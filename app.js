import express from 'express';
import cors from 'cors';
import userRouter from './routers/user.js';
import bodyParser from 'body-parser';
const app = express();

// app.set('redisClient', client);

const corsOptions = {
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(userRouter);
app.use(bodyParser.urlencoded({ extended: true })); // 解析 application/x-www-form-urlencoded 格式的请求体
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
