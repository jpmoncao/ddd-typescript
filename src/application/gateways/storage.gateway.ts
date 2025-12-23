export interface UploadParams {
    fileName: string;
    fileType: string;
    body: Buffer;
}

export interface StorageGateway {
    save(params: UploadParams): Promise<string>;
}