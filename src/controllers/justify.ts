import express from 'express';
import { authToken } from '../services/auth';

export async function postText(req: express.Request, res: express.Response, next: express.NextFunction) {
    if(!req.body) res.status(400).json({ msg: 'No text provided!' });
    const bearer = req.headers['authorization'];

    if (bearer) {
        const token = bearer.split(' ')[1];
        if (!(await authToken(token))) res.sendStatus(403).json({ msg: 'No auth token provided!' });
        
    } else {
        res.sendStatus(403).json({ msg: 'No auth token provided!' }); // Forbidden access
    }
}
