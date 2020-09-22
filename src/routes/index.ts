import express from 'express';
import { postText } from '../controllers/justify';
import { postEmail } from '../controllers/token';
const router = express.Router();

router.post('/justify', postText);
router.post('/token', postEmail);

export default router;
