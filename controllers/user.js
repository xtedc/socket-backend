import { setJwt } from '../utils/jwt.js';
import { find, insert, createUser } from '../utils/mysql.js'
import axios from 'axios';
import { checkLogin, setKey } from '../utils/redis.js';
import { randomName, randomAvatar } from '../utils/random.js'
import { selectOpenId } from '../utils/sqls.js'
const login = async (req, res) => {
  const { code } = req.query;
  const data = await axios.get(
    `https://api.weixin.qq.com/sns/jscode2session?appid=wx379c08f8a82f4d41&secret=11111&js_code=${code}&grant_type=authorization_code`
  );
  const { session_key, openid } = data.data;
  let userInfo = await find(selectOpenId(openid))
  // 用户不存在
  if (!userInfo.length) {
    const params = {
      openid,
      user_name: randomName(),
      user_avatar: randomAvatar(),
      phone_number: '13100909320',
      created_at: new Date(),
    }
    await createUser(params)
  }
  const token = setJwt(session_key);
  const redisResult = await setKey(req, `${openid}_${token}`, token);
  if (redisResult) {
    res.send({ status: 200, token, openid, msg: '登陆成功' });
  } else {
    res.send({ status: 500, msg: '连接超时，请重试' });
  }

};
const getUserInfo = async (req, res) => {
  const openid = req.headers['x-access-token'].split('_')[0]
  const isLogin = await checkLogin(req)
  if (isLogin) {
    let userInfo = await find(selectOpenId(openid))
    try {
      res.send({ status: 200, userInfo: userInfo[0] })
    } catch {
      res.send({ status: 401, msg: '网络错误，请重试' })
    }
  } else {
    res.send({ status: 401, msg: '请重新登录' });
  }
}
const createRoom = async (req, res) => {
  console.log(req);
  res.send({ status: 200 });
};
const test = async (req, res) => {
  let data = {
    openid: 'some_openid',
    user_name: 'some_username',
    user_avatar: 'some_avatar_url',
    phone_number: 'some_phone_number',
    created_at: new Date(),
  };
  const result = await query()
  console.log('result', result)
  // const info = await checkLogin(req);
  // if (info) {
  res.send({ status: 200, result });
  // } else {
  //   res.send({ status: 401, msg: '请重新登陆' });
  // }
};

export { login, test, createRoom, getUserInfo };
