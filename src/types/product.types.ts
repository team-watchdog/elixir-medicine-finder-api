import { Field, InputType, ObjectType } from "type-graphql";

@InputType("ProductInput")
@ObjectType()
export class Product {
    @Field()
    id: string;

    @Field()
    category: string;

    @Field()
    form: string;

    @Field()
    unit: string;

    @Field()
    generic: string;

    @Field(_ => [String])
    variations: string[];
}