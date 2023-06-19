const express = require('express');
const app = express();
const server = require('http').Server(app);
// const io = require('socket.io')(server);
const cors = require('cors');
const { log } = require('console');

const corsOptions = {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
};

const io = require('socket.io')(server, {
    // 允许跨域 WebSocket 请求
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        credentials: true
    }
});
let userList = []
let userIds = []
let messages = []
let triggers = []
// 使用自定义的 cors 中间件
app.use(cors(corsOptions));
io.on('connection', (socket) => {
    console.log('A user connected');
    // 登录(获取用户id)
    socket.on('login', data => {
        const ids = userList.map(res => res.id)
        if (ids.indexOf(data.id) === -1) {
            userList.push(data)
        }
        // console.log(userList);
        userIds = userList.map(res => res.id)
        io.emit('login', {
            msg: '登录成功',
            userList,
            userIds
        })
    })
    // 将之前的消息发送给新客户端
    socket.emit('previousMessages', triggers);
    // 监听来自客户端的消息
    socket.on('message', (data) => {
        console.log('Message received:', data);
        messages.push(data)
        // 将消息广播给所有连接的客户端
        io.emit('message', data);
    });
    // 监听来自客户端的转账事件
    socket.on('trigger', (data) => {
        console.log('trigger received:', data);
        triggers.push(data)
        const userIndex = userIds.indexOf(data.userId)
        const toUserIndex = userIds.indexOf(data.toUserId)
        const amount = data.amount
        userList[userIndex].amount = Number(userList[userIndex].amount) - Number(amount)
        userList[toUserIndex].amount = Number(userList[toUserIndex].amount) + Number(amount)
        // 将消息广播给所有连接的客户端
        io.emit('trigger', data);
        io.emit('userList', userList)
    });
    // 监听客户端断开连接事件
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server started on port 3000');
});