/*
  Warnings:

  - A unique constraint covering the columns `[messageId,conversationId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Message_messageId_conversationId_key" ON "Message"("messageId", "conversationId");
