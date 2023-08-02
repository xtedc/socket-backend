import redis from 'redis';
const redisInfo = {
  socket: {
    host: '123.207.213.124',
    port: 6379,
  },
  password: '0305.1012',
};
const client = redis.createClient(redisInfo);
client.on('connect', () => {
  console.log('connect');
});
client.on('ready', () => {
  console.log('ready');
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});
client.on('error', (err) => {
  console.error('Redis error:', err);
});
const checkLogin = async (req) => {
  const token = req.headers['x-access-token'];
  client.connect();
  const info = await client.get(token);
  client.quit();
  return info;
};
const setKey = async (req, key, value) => {
  client.connect();
  const info = await client.set(key, value);
  client.quit();
  console.log('info', info);
  return info;
};
const getKey = async (req, key) => {
  client.connect();
  const info = await client.get(key);
  client.quit();
  return info;
};
export { checkLogin, setKey, getKey };
