import { LocationResolver } from "./location.resolver";
import { AuthResolver } from "./auth.resolver";
import { AccountResolver } from "./account.resolver";
import { ProductResolver } from "./product.resolver"
import { MedicineRequestResolver } from "./medicineRequest.resolver";

export const resolvers = [
    AuthResolver,
    AccountResolver,
    LocationResolver,
    ProductResolver,
    MedicineRequestResolver,
] as const;

