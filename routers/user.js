import express from 'express'
import { login, test, createRoom, getUserInfo } from '../controllers/user.js'
const router = express.Router();

router.get('/login', login);
router.get('/user', getUserInfo);
router.post('/test', test);
router.post('/createRoom', createRoom);

export default router;