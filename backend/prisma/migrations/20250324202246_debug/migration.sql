-- AlterTable
ALTER TABLE "Hospital" ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "location_distance" DOUBLE PRECISION,
ADD COLUMN     "price_emergency" INTEGER,
ADD COLUMN     "price_general" INTEGER,
ADD COLUMN     "price_icu" INTEGER,
ADD COLUMN     "price_pediatric" INTEGER,
ADD COLUMN     "rating" DOUBLE PRECISION;
