import { AppError } from "./app-error";

/**
 * Credenciais inválidas (retorna 401 (Unauthorized))
 */
export class InvalidCredentialsError extends AppError {
    constructor() {
        super(`Credenciais inválidas.`, 401, 'invalid_credentials_error');
    }
}