import express from 'express';
import { generateToken } from '../services/auth';

export async function postEmail(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { email } = req.body;

    try {
        const token = await generateToken(email);
        if (!token) throw 'An unknown error occured while generating token';
        res.status(200).json({
            token,
        });
    } catch(err) {
        res.status(400).json({
            msg: err,
        });
    }
}
