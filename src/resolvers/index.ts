import { LocationResolver } from "./location.resolver";
import { AuthResolver } from "./auth.resolver";
import { AccountResolver } from "./account.resolver";

export const resolvers = [
    AuthResolver,
    AccountResolver,
    LocationResolver,
] as const;

