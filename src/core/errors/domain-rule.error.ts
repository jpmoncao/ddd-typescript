import { AppError } from "./app-error";

/**
 * Regras de negócio violadas (retorna 400 (Bad Request))
 */
export class DomainRuleError extends AppError {
    constructor(message: string) {
        super(message, 400, 'domain_rule_error');
    }
}