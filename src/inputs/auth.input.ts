import { InputType, Field, Int } from "type-graphql";

@InputType()
export class GetOTPInput {
    @Field()
    phoneNumber: string;
}

@InputType()
export class AuthenticateInput{
    @Field(_ => Int)
    otpId: number

    @Field()
    otp: string;
}

@InputType()
export class RegisterDeviceInput{
    @Field()
    deviceToken: string;
}