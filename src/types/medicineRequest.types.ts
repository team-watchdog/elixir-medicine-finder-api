import { ObjectType, InputType, Field, Int } from "type-graphql";

// types
import { Product } from "./product.types";
import { Pharmacy } from "./pharmacy.types";
import { Coordinate } from "./location.types";

@InputType("PharamacyResponseInput")
export class PharamacyResponseInput{
    @Field(_ => Int)
    id: number;

    @Field(_ => Int)
    requestId: number;

    @Field(_ => Int)
    pharmacyId: number;

    @Field(_ => [Product])
    availableProducts: Product[];
}

@ObjectType("PharmacyResponse")
export class PharmacyResponse extends PharamacyResponseInput{
    @Field(_ => Pharmacy)
    pharmacy: Pharmacy;

    @Field(_ => Date)
    createdAt: Date;

    @Field(_ => Date)
    updatedAt: Date;
}

@InputType("MedicineRequestInput")
export class MedicineRequestInput{
    @Field()
    name: string;

    @Field(_ => [Product])
    products: Product[];

    @Field(_ => Coordinate, { nullable: true })
    location: Coordinate | null;
}


@ObjectType("MedicineRequest")
export class MedicineRequest{
    @Field(_ => Int)
    id: number;

    @Field()
    name: string;

    @Field(_ => [Product])
    products: Product[];

    @Field(_ => Coordinate, { nullable: true })
    location: Coordinate | null;

    @Field(_ => Date)
    createdAt: Date;

    @Field(_ => Date)
    updatedAt: Date;
}