import express from 'express';
import getAuthToken from '../services/authenticator';

export async function postEmail(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(req);
    const { email, } = req.body;

    try {
        const token = await getAuthToken(email);
        if (!token) throw 'An unknown error occured while generating token';
        res.status(200).json({
            token,
        });
    } catch(err) {
        res.sendStatus(400).json({
            msg: err,
        });
    }
}
