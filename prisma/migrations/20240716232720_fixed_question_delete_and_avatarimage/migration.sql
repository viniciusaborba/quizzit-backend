-- DropForeignKey
ALTER TABLE "alternatives" DROP CONSTRAINT "alternatives_question_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "avatar_image" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "alternatives" ADD CONSTRAINT "alternatives_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
