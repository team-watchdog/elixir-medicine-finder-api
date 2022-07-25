import { Mutation, Resolver, Ctx, Authorized, Arg, Query } from "type-graphql";
import { Context } from "apollo-server-core";

// types
import { CustomError } from "../shared/errors";
import { AuthenticatedRequest } from "../auth/customAuthCheck";

// input
import { PharmacyRegistrationInput } from "../inputs/pharmacy.input";

// shared
import { prisma } from "../shared/db";
import { Account } from "../types/auth.types";

@Resolver()
export class AccountResolver {
    @Authorized()
    @Query(_ => Account)
    async me(@Ctx() ctx: Context<AuthenticatedRequest>): Promise<Account> {
        const account = await prisma.account.findFirst({
            where: {
                id: ctx.user.id,
            },
        });

        if (!account) throw new CustomError("Invalid account", "Invalid account");
        return account as Account;
    }

    @Authorized()
    @Mutation(() => Boolean)
    async registerAsPatient(@Ctx() ctx: Context<AuthenticatedRequest>): Promise<boolean> {
        const account = await prisma.account.findFirst({
            where: {
                id: ctx.user.id,
                type: null,
            },
        });

        if (!account) throw new CustomError("Invalid account", "Invalid account");

        await prisma.account.update({
            where: {
                id: ctx.user.id,
            },
            data: {
                type: "PATIENT",
            }
        });

        return true;
    }

    @Authorized()
    @Mutation(() => Boolean)
    async registerPharmacy(@Arg("data") data: PharmacyRegistrationInput, @Ctx() ctx: Context<AuthenticatedRequest>): Promise<boolean> {
        const account = await prisma.account.findFirst({
            where: {
                id: ctx.user.id,
                type: null,
            },
        });

        if (!account) throw new CustomError("Invalid account", "Invalid account");

        await prisma.$transaction([
            prisma.pharmacy.create({
                data: {
                    name: data.name,
                    registrationNo: data.registrationNo,
                    location: JSON.stringify(data.location),
                    phoneNumber: data.phoneNumber,
                    accountId: ctx.user.id,
                }
            }),
            prisma.account.update({
                where: {
                    id: ctx.user.id,
                },
                data: {
                    type: "PHARMACY",
                }
            })
        ]);

        // TODO: sync pharamacy with elasticsearch

        return true;
    }
}