export interface Encrypter {
    encrypt(payload: Record<string, unknown>): Promise<string>;
    decrypt<T>(token: string): Promise<T>;
}