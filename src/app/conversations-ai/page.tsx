'use client'
import Navbar from '../(Components)/navbarMain';
import ConversationDrawer from '../(Components)/conversationDrawer';
import MainChat from '../(Components)/mainChat';
import { useUser, useClerk} from '@clerk/nextjs';

export default function Page() {
    const user = useUser();
    return (
        <>
            <Navbar />
            <main className="flex flex-col pl-64 h-[calc(100vh-64px)] flex-grow bg-base-300">
                <ConversationDrawer />
                <MainChat />
            </main>
        </>
    );
}