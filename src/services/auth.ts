import jwt, { Secret } from 'jsonwebtoken';
import User from '../db/model/User';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface UserPayload {
    user: {
        id: any,
    },
};

export async function generateToken(email: string): Promise<string> {
    if (!EMAIL_REGEX.test(email)) throw 'The provided email has an invalid format!';
    if (User.findOne({ email })) throw 'User already registered!';

    let user = new User({ email: email });
    await user.save();

    const payload = {
        user: {
            id: user.id,
        },
    };

    try {
        return jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: 10000 });
    } catch {
        return '';
    }
    
}

export async function authToken(token: string): Promise<boolean> {
    const payload = <UserPayload>jwt.verify(token, String(process.env.JWT_SECRET));

    return Boolean(User.findById(<string> payload.user.id));
}
