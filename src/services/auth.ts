import jwt, { TokenExpiredError } from 'jsonwebtoken';
import User from '../db/model/User';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface UserPayload {
    user: {
        id: any,
    },
};

/**
 * Generates an authentication token with jwt by registering an user with its email
 * @param {string} email Email of the user
 * @returns a JWT-compliant auth token
 * @see https://tools.ietf.org/html/rfc7519
 */
export async function generateToken(email: string): Promise<string> {
    if (!EMAIL_REGEX.test(email)) throw 'The provided email has an invalid format!';
    if (await User.findOne({ email }).exec()) throw 'User already registered!';

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

/**
 * Determines whether the provided token is valid and registered
 * @param token The authentication token
 */
export async function authToken(token: string): Promise<boolean> {
    try {
        const payload = <UserPayload>jwt.verify(token, String(process.env.JWT_SECRET), { ignoreExpiration: true });
        return Boolean(await User.findById(<string> payload.user.id).exec());
    } catch(e) {
        return false;
    }
}
