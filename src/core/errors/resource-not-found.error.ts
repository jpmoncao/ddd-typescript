import { AppError } from "./app-error";

/**
 * Recurso não encontrado (retorna 404 (Not Found))
 */
export class ResourceNotFoundError extends AppError {
    constructor(resourceName: string = 'Recurso') {
        super(`${resourceName} não encontrado(a).`, 404, 'resource_not_found_error');
    }
}