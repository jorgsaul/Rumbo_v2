-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'NEW_FOLLOWER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notificationSettings" JSONB DEFAULT '{"push_nuevo_post": true, "email_nuevo_post": true, "push_nuevo_seguidor": true, "email_nuevo_seguidor": true, "push_nuevo_comentario": true, "email_nuevo_comentario": true}';

-- CreateTable
CREATE TABLE "conversation_history" (
    "id" TEXT NOT NULL DEFAULT concat('ch_', (gen_random_uuid())::text),
    "user_id" TEXT NOT NULL,
    "agent" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversation_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "conversation_history_user_id_agent_created_at_idx" ON "conversation_history"("user_id", "agent", "created_at" DESC);

-- AddForeignKey
ALTER TABLE "conversation_history" ADD CONSTRAINT "conversation_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
