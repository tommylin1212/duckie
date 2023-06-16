import { PrismaClient, User, Conversation, Message} from "@prisma/client"
import { Prisma} from "@prisma/client"
const prisma = new PrismaClient()



export function upsertUser(clerkId:string,data:Prisma.UserCreateInput): Promise<User> {
    return prisma.user.upsert({
        where: { clerkId },
        update: data,
        create: data,
    })
}

export function createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data })
}

export function getAllUsers(): Promise<User[]> {
    return prisma.user.findMany()
}

export function getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } })
}

export function updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({ where: { id }, data })
}

export function deleteUser(id: string): Promise<User> {
    return prisma.user.delete({ where: { id } })
}

export function createConversation(data: Prisma.ConversationCreateInput): Promise<Conversation> {
    return prisma.conversation.create({ data })
}

export function getAllConversations(): Promise<Conversation[]> {
    return prisma.conversation.findMany()
}

export function getConversationById(id: string): Promise<Conversation | null> {
    return prisma.conversation.findUnique({ where: { id } })
}

export function updateConversation(id: string, data: Prisma.ConversationUpdateInput): Promise<Conversation> {
    return prisma.conversation.update({ where: { id }, data })
}

export function deleteConversation(id: string): Promise<Conversation> {
    return prisma.conversation.delete({ where: { id } })
}
export function createMessage(data: Prisma.MessageCreateInput): Promise<Message> {
    return prisma.message.create({ data })
  }
  
  export function getAllMessages(): Promise<Message[]> {
    return prisma.message.findMany()
  }
  
  export function getMessageById(id: string): Promise<Message | null> {
    return prisma.message.findUnique({ where: { id } })
  }
  
  export function updateMessage(id: string, data: Prisma.MessageUpdateInput): Promise<Message> {
    return prisma.message.update({ where: { id }, data })
  }
  
  export function deleteMessage(id: string): Promise<Message> {
    return prisma.message.delete({ where: { id } })
  }