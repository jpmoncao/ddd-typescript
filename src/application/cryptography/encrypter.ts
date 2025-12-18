export interface Encrypter {
    encrypt<T>(payload: T): Promise<string>;
}