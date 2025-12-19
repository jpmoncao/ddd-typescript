import multer from 'multer';

const storage = multer.memoryStorage();

export const uploadComprovanteEntrega = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/webp'
        ];

        if (!allowedMimes.includes(file.mimetype)) {
            cb(new Error('Tipo de arquivo inválido. Apenas imagens são permitidas.'));
            return;
        }

        cb(null, true);
    }
});