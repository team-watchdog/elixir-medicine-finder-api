import { AuthChecker } from "type-graphql";
import { Request } from "express-jwt";

// types
import { Account } from "../types/auth.types";

export interface AuthenticatedRequest extends Request {
    user: Account;
}

export const customAuthCheck: AuthChecker<AuthenticatedRequest> = ({ context }, action) => {
    if (!context.user) return false;
    return true;
}