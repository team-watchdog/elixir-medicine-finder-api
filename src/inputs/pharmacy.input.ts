import { InputType, Field, Int } from "type-graphql";

// types
import { Location } from "../types/location.types";

@InputType()
export class PharmacyRegistrationInput{
    @Field()
    name: string;

    @Field()
    registrationNo: string;

    @Field()
    phoneNumber: string;

    @Field(_ => Location)
    location: Location;
}