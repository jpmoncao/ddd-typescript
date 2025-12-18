import { hash, compare } from 'bcryptjs';
import { Encrypter } from '../../application/cryptography/encrypter';

export class BcryptEncrypter implements Encrypter {
    private HASH_SALT_LENGTH = 8;

    async hash(plain: string): Promise<string> {
        return hash(plain, this.HASH_SALT_LENGTH);
    }

    async compare(plain: string, hash: string): Promise<boolean> {
        return compare(plain, hash);
    }
}