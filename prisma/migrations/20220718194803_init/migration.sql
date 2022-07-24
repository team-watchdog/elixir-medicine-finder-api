-- CreateTable
CREATE TABLE "OTPToken" (
    "id" SERIAL NOT NULL,
    "hashedPhoneNumber" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OTPToken_pkey" PRIMARY KEY ("id")
);
