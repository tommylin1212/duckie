"use server";
import { PrismaClient, User, Conversation, Message } from "@prisma/client";
import { Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export async function upsertUser(
  clerkId: string,
  data: Prisma.UserCreateInput
): Promise<User> {
  return prisma.user.upsert({
    where: { clerkId },
    update: data,
    create: data,
  });
}

export async function createUser(data: Prisma.UserCreateInput): Promise<User> {
  return prisma.user.create({ data });
}

export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}
export async function getUserByClerkId(clerkId: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { clerkId } });
}

export async function updateUser(
  id: string,
  data: Prisma.UserUpdateInput
): Promise<User> {
  return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({ where: { id } });
}

export async function createConversation(
  data: Prisma.ConversationCreateInput
): Promise<Conversation> {
  return prisma.conversation.create({ data });
}

export async function getAllConversationsByClerkId(
  clerkId: string
): Promise<Conversation[]> {
  return prisma.conversation.findMany({
    where: {
      user: {
        clerkId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function getNewestConversationByClerkId(
  clerkId: string
): Promise<Conversation[]> {
  return prisma.conversation.findMany({
    where: {
      user: {
        clerkId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });
}

export async function getAllConversations(): Promise<Conversation[]> {
  return prisma.conversation.findMany();
}

export async function getConversationById(
  id: string
): Promise<Conversation | null> {
  return prisma.conversation.findUnique({ where: { id } });
}

type ConversationWithMessages = Conversation & {
  messages: Message[];
};

export async function getConversationByIdWithMessages(
  id: string
): Promise<ConversationWithMessages | null> {
  return prisma.conversation.findUnique({
    where: { id },
    include: {
      messages: true,
    },
  });
}

export async function updateConversation(
  id: string,
  data: Prisma.ConversationUpdateInput
): Promise<Conversation> {
  return prisma.conversation.update({ where: { id }, data });
}
//needs to delete all messages in the conversation first
export async function deleteConversation(id: string): Promise<void> {
  await prisma.message.deleteMany({ where: { conversationId: id } });
  await prisma.conversation.delete({ where: { id } });
}

export async function createMessage(
  data: Prisma.MessageCreateInput
): Promise<Message> {
  return prisma.message.create({ data });
}

export async function upsertMessageByMessageIdAndConversationId(
  messageId: string,
  conversationId: string,
  data: Prisma.MessageCreateInput
): Promise<Message> {
  return prisma.message.upsert({
    where: { messageId_conversationId_unique: { messageId, conversationId } },
    update: data,
    create: data,
  });
}

export async function getAllMessages(): Promise<Message[]> {
  return prisma.message.findMany();
}

export async function getMessageById(id: string): Promise<Message | null> {
  return prisma.message.findUnique({ where: { id } });
}

export async function updateMessage(
  id: string,
  data: Prisma.MessageUpdateInput
): Promise<Message> {
  return prisma.message.update({ where: { id }, data });
}

export async function deleteMessage(id: string): Promise<Message> {
  return prisma.message.delete({ where: { id } });
}
