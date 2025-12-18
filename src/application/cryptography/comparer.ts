export interface Comparer {
    compare(plain: string, hash: string): Promise<boolean>;
}
