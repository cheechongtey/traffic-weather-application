-- AlterTable
ALTER TABLE "SearchHistory" ALTER COLUMN "datetime" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "datetime" SET DATA TYPE TIMESTAMPTZ(3);