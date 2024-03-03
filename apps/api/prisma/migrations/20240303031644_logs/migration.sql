-- CreateTable
CREATE TABLE "Logs" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchHistory" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "location_name" TEXT NOT NULL,
    "location_coordinates" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SearchHistory_datetime_location_name_idx" ON "SearchHistory"("datetime", "location_name");
