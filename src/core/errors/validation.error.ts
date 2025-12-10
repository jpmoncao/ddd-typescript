import { AppError } from "./app-error";

/**
 * Dados inválidos na requisição (retorna 400 (Bad Request))
 */
export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400, 'validation_error');
    }
}