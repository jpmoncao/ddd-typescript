import { UserRole } from "../core/types/user-role";

declare global {
    namespace Express {
        export interface Request {
            user?: {
                id: string;
                role?: UserRole
            };
        }
    }
}