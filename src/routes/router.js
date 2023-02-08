import { Router } from 'express';
import { createUser, login } from '../controller/UserController.js';

const router = Router();
router.post('/users/regist', createUser);
router.post('/users/login', login);
export default router;
