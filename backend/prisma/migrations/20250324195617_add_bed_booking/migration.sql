-- CreateTable
CREATE TABLE "BedBooking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "bedType" TEXT NOT NULL,
    "admissionDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BedBooking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BedBooking" ADD CONSTRAINT "BedBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BedBooking" ADD CONSTRAINT "BedBooking_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
