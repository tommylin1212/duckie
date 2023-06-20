"use client";
import Navbar from "../(Components)/navbarMain";
import ConversationDrawer from "../(Components)/conversationDrawer";
import MainChat from "../(Components)/mainChat";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const user = useUser();
  return (
    <>
      <Navbar />
      <main className="flex h-[calc(100vh-64px)] flex-col bg-base-300 pl-64 pt-[64px]">
        <ConversationDrawer />
        <MainChat />
      </main>
    </>
  );
}
