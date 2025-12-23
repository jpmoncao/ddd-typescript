import fs from 'node:fs';
import path from 'node:path';
import { StorageGateway, UploadParams } from "../../application/gateway/storage";

export class DiskStorageGateway implements StorageGateway {
    private uploadFolder: string = path.resolve(process.cwd(), 'uploads');

    constructor() {
        if (!fs.existsSync(this.uploadFolder)) {
            fs.mkdirSync(this.uploadFolder, { recursive: true });
        }
    }

    async save({ fileName, body }: UploadParams): Promise<string> {
        const filePath = path.join(this.uploadFolder, fileName);

        await fs.promises.writeFile(filePath, body);

        return fileName;
    }
}