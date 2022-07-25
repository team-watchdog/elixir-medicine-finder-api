import { Arg, Mutation, Resolver } from "type-graphql";

// types
import { MedicineRequest, MedicineRequestInput } from "../types/medicineRequest.types";

// client
import { elasticClient } from "../shared/elastic";

@Resolver()
export class MedicineRequestResolver {
    @Mutation(_ => MedicineRequest, { nullable: true })
    async createMedicineRequest(@Arg("data") data: MedicineRequestInput): Promise<MedicineRequest | null>{
        return null;
    }
}