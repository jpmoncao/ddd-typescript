import jwt from 'jsonwebtoken';
import { Decrypter } from '../../application/cryptography/decrypter';

export class JwtDecrypter implements Decrypter {
    private secret = process.env.API_JWT_SECRET || 'default_secret';

    async decrypt<T>(token: string): Promise<T> {
        const payload = jwt.verify(token, this.secret);

        return payload as T;
    }
}