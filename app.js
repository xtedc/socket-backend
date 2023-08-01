import express from 'express'
import cors from 'cors'
import redis from 'redis'
import userRouter from './routers/user.js'
const app = express();
const redisUrl = 'redis://127.0.0.1:6379'
const client = redis.createClient(redisUrl);

client.on('error', (err) => {
    console.error('Redis error:', err);
});
app.set('redisClient', client);

const corsOptions = {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(userRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});