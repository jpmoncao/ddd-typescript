export interface Decrypter {
    decrypt<T>(token: string): Promise<T>;
}