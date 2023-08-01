import express from 'express'
import { login, test, createRoom } from '../controllers/user.js'
const router = express.Router();

router.get('/login', login);
router.post('/test', test);
router.post('/createRoom', createRoom);

export default router;