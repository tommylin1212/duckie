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
  const [showSidebar, setShowSidebar] = useState(true);
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
    <div className="flex min-h-screen flex-col max-h-[calc(100vh-64px)] overflow-hidden">
      <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar}/>
      <main className="flex flex-grow flex-col bg-base-300 pt-[64px] ">
        <div className="flex flex-row flex-grow">

        <ConversationDrawer
          showSidebar={showSidebar}
          setConversation={setConversationId}
          conversations={conversations}
          deleteConversation={removeConversation}
        />
        <MainChat
          currentConversation={conversationId}
          setConversation={setConversationId}
        />
        </div>
      </main>
      </div>
    </>
  );
}
