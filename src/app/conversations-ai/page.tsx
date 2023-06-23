"use client";
import Navbar from "../(Components)/navbarMain";
import ConversationDrawer from "../(Components)/conversationDrawer";
import MainChat from "../(Components)/mainChat";
import { useUser } from "@clerk/nextjs";
import {useEffect, useState } from "react";
import { getAllConversationsByClerkId } from "@/Utils/DB/operations";
import { type Conversation } from "@prisma/client";

export default function Page() {
  const {user} = useUser();
  const [conversationId, setConversationId] = useState("");
  
  
  const [conversations, setConversations] = useState<Array<Conversation>>([]);
  useEffect(() => {
    async function getConversationsAsync(clerkId: string) {
      const conversations = await getAllConversationsByClerkId(clerkId);
      if(conversations){
      setConversations(conversations);
      }
    }
    if (user) {
      getConversationsAsync(user.id);
    }
  }, [user,conversationId]);
  useEffect(() => {
    //reRedender the main chat when the conversation changes
  }, [conversationId]);

  return (
    <>
      <Navbar />
      <main className="flex h-[calc(100vh-64px)] flex-col bg-base-300 pl-64 pt-[64px]">
        <ConversationDrawer setConversation={setConversationId} conversations={conversations}/>
        <MainChat currentConversation={conversationId} setConversation={setConversationId}/>
      </main>
    </>
  );
}
