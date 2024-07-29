/*
  Warnings:

  - You are about to drop the `_QuestionToSubject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subject_id` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_QuestionToSubject" DROP CONSTRAINT "_QuestionToSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionToSubject" DROP CONSTRAINT "_QuestionToSubject_B_fkey";

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "subject_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_QuestionToSubject";

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
