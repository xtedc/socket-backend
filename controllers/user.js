import { setJwt } from '../utils/jwt.js'
import axios from 'axios'
const login = async (req, res) => {
    console.log(req.query.code)
    try {
        const redisClient = req.app.get('redisClient');
        const { code } = req.query
        const data = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=wx379c08f8a82f4d41&secret=f74b2dc0560e653f95fb1c8dba3d7128&js_code=${code}&grant_type=authorization_code`)
        console.log(data)
        const { session_key, openid } = data.data
        const token = setJwt(session_key)
        redisClient.connect();
        redisClient.set(`${openid}${token}`, `token:${token}`)
        redisClient.quit()
        res.send({ status: 200, token, openid, msg: '登陆成功' });
    } catch {
        res.send({ status: 500, msg: '连接超时，请重试' });
    }
};
const createRoom = async (req, res) => {
    console.log(req)
    res.send({ status: 200 });
}
const test = async (req, res) => {
    console.log(req)
    // const redisClient = req.app.get('redisClient');
    // redisClient.connect();
    // redisClient.set('aaa', '123321')
    // redisClient.quit()
    res.send({ status: 200 });
};

export {
    login, test, createRoom
}