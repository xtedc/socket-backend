import jwt from 'jsonwebtoken'
const secret = 'socket_key';

const setJwt = (payload) => {
    const token = jwt.sign({ payload }, secret, { expiresIn: '12h' });
    return token
}
const getJwt = (token) => {
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(decoded);
    })
}
export { setJwt, getJwt };