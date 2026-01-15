/*
  Warnings:

  - You are about to drop the column `project` on the `time_entry` table. All the data in the column will be lost.
  - Added the required column `project_id` to the `time_entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `time_entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."time_entry" DROP COLUMN "project",
ADD COLUMN     "project_id" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_title_key" ON "public"."project"("title");

-- AddForeignKey
ALTER TABLE "public"."time_entry" ADD CONSTRAINT "time_entry_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
