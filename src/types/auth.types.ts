import { Field, Int, ObjectType, registerEnumType } from "type-graphql";

export enum AccountType {
    PATIENT = "PATIENT",
    PHARMACY = "PHARMACY"
}

registerEnumType(AccountType, {
    name: "AccountType", // this one is mandatory
    description: "Represents account type", // this one is optional
  });

@ObjectType()
export class Account{
    @Field(_ => Int)
    id: number;

    @Field()
    hashedPhoneNumber: string;

    @Field(_ => AccountType, { nullable: true })
    type: AccountType;

    @Field({ nullable: true })
    deviceToken: string;

    @Field(_ => Date)
    createdAt: Date;

    @Field(_ => Date)
    updatedAt: Date;
}

@ObjectType()
export class AuthenticateResponse{
    @Field(_ => Account)
    account: Account;

    @Field()
    token: string;
}