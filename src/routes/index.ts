import express from "express";
const router = express.Router();

router.post('justify');
router.post('token');

export { router as routes };