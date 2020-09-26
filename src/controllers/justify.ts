import express from 'express';
import { authToken } from '../services/auth';
import { justify } from '../services/textJustifier';

export async function postText(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
    if(!req.body) return res.status(400).json({ msg: 'No text provided!' });
    const bearer = req.headers['authorization'];

    if (bearer) {
        const token = bearer.split(' ')[1];
        if (!(await authToken(token))) return res.status(403).json({ msg: 'No auth token provided!' });
        if (req.headers['content-type'] != 'text/plain') return res.sendStatus(415);

        // let wordsCount: number = (<string> req.body).split(' ').length;

        res.status(200).send(justify(req.body));
    } else {
        return res.status(403).json({ msg: 'No auth token provided!' }); // Forbidden access
    }
}
