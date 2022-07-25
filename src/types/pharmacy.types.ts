import { ObjectType, Field, Int } from "type-graphql";

import { Location } from "./location.types";

@ObjectType()
export class Pharmacy{
    @Field(_ => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    registrationNo: string;

    @Field()
    phoneNumber: string;

    @Field(_ => Location)
    location: Location;

    @Field(_ => Date)
    createdAt: Date;

    @Field(_ => Date)
    updatedAt: Date;
}