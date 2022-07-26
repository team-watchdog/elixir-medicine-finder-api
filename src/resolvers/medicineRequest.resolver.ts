import { Arg, Mutation, Resolver } from "type-graphql";
import { Prisma, Request } from "@prisma/client";

// types
import { MedicineRequest, MedicineRequestInput } from "../types/medicineRequest.types";

// client
import { elasticClient } from "../shared/elastic";
import { prisma } from "../shared/db";
import { Product } from "../types/product.types";

@Resolver()
export class MedicineRequestResolver {
    private parsePrismaRequest(request: Request): MedicineRequest {
        const parsedLocation = request.location ? JSON.parse(request.location as string) : null;
        const parsedProducts: Product[] = [];

        for (let p of request.products as string[]) {
            parsedProducts.push(JSON.parse(p) as Product);
        }

        return {
            ...request,
            location: request.location ? {
                lat: parsedLocation.lat as number,
                lon: parsedLocation.lon as number,
            } : null,
            products: parsedProducts,
        }
    }

    @Mutation(_ => MedicineRequest, { nullable: true })
    async createMedicineRequest(@Arg("data") data: MedicineRequestInput): Promise<MedicineRequest | null>{
        console.log(data);
        const request = await prisma.request.create({
            data: {
                ...data,
                location: JSON.stringify(data.location),
                products: JSON.stringify(data.products),
                itemCount: data.products.length,
                fullfilledCount: 0,
                fullfilled: data.products.length === 0 ? true : false,
            }
        });

        const parsedRequest: MedicineRequest = this.parsePrismaRequest(request);

        await elasticClient.index({
            index: "medicine-requests",
            id: `${request.id}`,
            body: parsedRequest,
        });

        return parsedRequest;
    }
}