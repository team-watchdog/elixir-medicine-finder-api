import { Arg, Int, Mutation, Resolver } from "type-graphql";
import { generate } from "randomstring";
import bcrypt from "bcrypt";
import { createHash } from "crypto";
import moment from "moment";
import jwt from "jsonwebtoken";

// types
import { CustomError } from "../shared/errors";
import { Account, AuthenticateResponse } from "../types/auth.types";

// input
import { GetOTPInput, AuthenticateInput } from "../inputs/auth.input";

// shared
import { Notify } from "../shared/notify";
import { prisma } from "../shared/db";

// constants
const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";

@Resolver()
export class AuthResolver {
    @Mutation(() => Int)
    async getOTP(@Arg("data") data: GetOTPInput): Promise<number> {
        const otp = generate({ length: 6, charset: "numeric" });
        const otpHashed = await bcrypt.hash(otp, 10);

        const phoneSum = createHash('sha1').update(data.phoneNumber).digest('hex');

        const textSent = await Notify.sendSMS(
            ["94", data.phoneNumber.slice(1, data.phoneNumber.length)].join(""), 
            `Your code for Watchdog Elixir Medicine Finder is ${otp}`
        );

        if (!textSent) throw new CustomError("Error sending OTP", "3rd Party");

        const token = await prisma.oTPToken.create({
            data: {
                hashedPhoneNumber: phoneSum,
                hashedPassword: otpHashed,
                expiresAt: moment().add(5, "minutes").toDate(),
            }
        });

        return token.id;
    }

    @Mutation(_ => AuthenticateResponse)
    async authenticate(@Arg("data") data: AuthenticateInput): Promise<AuthenticateResponse> {
        const otpToken = await prisma.oTPToken.findFirst({
            where: {
                id: data.otpId,
                expiresAt: {
                    gte: new Date()
                }
            }
        });

        if (!otpToken) throw new CustomError("Invalid OTP", "Invalid OTP");
        if (!bcrypt.compareSync(data.otp, otpToken.hashedPassword)) {
            throw new CustomError("Invalid OTP", "Invalid OTP");
        }

        let account = await prisma.account.findFirst({
            where: {
                hashedPhoneNumber: otpToken.hashedPhoneNumber
            }
        });

        if (!account) {
            account = await prisma.account.create({
                data: {
                    hashedPhoneNumber: otpToken.hashedPhoneNumber,
                }
            })
        }

        // Generate Token
        const token = jwt.sign(account, JWT_SECRET, { algorithm: "HS256" });

        return {
            account: account as Account,
            token: token,
        }
    }
}