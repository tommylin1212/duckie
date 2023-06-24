"use client";
import Navbar from "../(Components)/navbarMain";
import ConversationDrawer from "../(Components)/conversationDrawer";
import MainChat from "../(Components)/mainChat";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  getAllConversationsByClerkId,
  deleteConversation,
} from "@/Utils/DB/operations";
import { type Conversation } from "@prisma/client";

//TODO: add the ability to delete conversations
async function deleteConversationFromDB(
  conversationId: string,
  currentConversation: string
) {
  //delete the conversation
  deleteConversation(conversationId);

  //if it is the current conversation, set the current conversation to ""
  if (conversationId === currentConversation) {
    return "";
  }
  return currentConversation;
}
export default function Page() {
  const { user } = useUser();
  const [conversationId, setConversationId] = useState("");
  async function removeConversation(deleteConversationId: string) {
    deleteConversationFromDB(deleteConversationId, conversationId).then(
      (newConversationId) => {
        setConversationId(newConversationId);
        if (!user) return;
        getConversationsAsync(user.id);
      }
    );
  }

  async function getConversationsAsync(clerkId: string) {
    const conversations = await getAllConversationsByClerkId(clerkId);
    if (conversations) {
      setConversations(conversations);
    }
  }

  const [conversations, setConversations] = useState<Array<Conversation>>([]);
  useEffect(() => {
    if (user) {
      getConversationsAsync(user.id);
    }
  }, [user, conversationId]);

  return (
    <>
      <Navbar />
      <main className="flex h-[calc(100vh-64px)] flex-col bg-base-300 pl-64 pt-[64px]">
        <ConversationDrawer
          setConversation={setConversationId}
          conversations={conversations}
          deleteConversation={removeConversation}
        />
        <MainChat
          currentConversation={conversationId}
          setConversation={setConversationId}
        />
      </main>
    </>
  );
}
