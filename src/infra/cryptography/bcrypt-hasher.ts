import { hash, compare } from 'bcryptjs';
import { Hasher } from '../../application/cryptography/hasher';

export class BcryptHasher implements Hasher {
    private HASH_SALT_LENGTH = 8;

    async hash(payload: string): Promise<string> {
        return hash(payload, this.HASH_SALT_LENGTH);
    }

    async compare(plain: string, hashed: string): Promise<boolean> {
        return await compare(plain, hashed);
    }
}