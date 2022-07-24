import { Field, Float, InputType, ObjectType } from "type-graphql";

@InputType("CoordinateInput")
@ObjectType()
export class Coordinate{
    @Field(_ => Float)
    lat: number;
    
    @Field(_ => Float)
    lon: number;
}

@InputType("LocationInput")
@ObjectType()
export class Location {
    @Field()
    placeId: string;

    @Field(_ => Coordinate)
    geo: Coordinate;

    @Field()
    formattedAddress: string;

    @Field()
    district: string;

    @Field()
    province: string;
}
