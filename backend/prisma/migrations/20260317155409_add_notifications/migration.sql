-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('NEW_POST_FOLLOWED', 'POST_COMMENT', 'COMMENT_REPLY', 'FORUM_REQUEST', 'POST_HIDDEN', 'ACCOUNT_DEACTIVATED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deactivationReason" TEXT;

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
