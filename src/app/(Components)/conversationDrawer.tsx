"use client";

import { useState } from "react";

type ConversationDrawerConversation = {
  id: string;
  title: string;
};
type ConversationDrawerProps = {
  conversations: ConversationDrawerConversation[];
  setConversation: (conversationId: string) => void;
  deleteConversation: (conversationId: string) => void;
  showSidebar: boolean;
};

export default function ConversationDrawer(props: ConversationDrawerProps) {
  const [deleting, setDeleting] = useState("empty");
  const { showSidebar, setConversation, conversations, deleteConversation } =
    props;
  return (
    <div
      className={` z-10 fixed h-[calc(100vh-64px)] left-0 max-h-[calc(100vh-64px)] max-w-[256px] flex-col overflow-y-scroll border-r bg-base-200 ${
        showSidebar ? "flex" : "hidden"
      }  md:relative md:z-0` }
    >
      <div className="navbar sticky top-0 z-10 h-10 justify-center bg-base-200">
        Conversations
      </div>
      <div className="flex flex-col  p-2">
        <button
          className="btn-ghost btn-active btn"
          onClick={() => setConversation("")}
        >
          {"Start New Conversation"}
        </button>
      </div>
      {conversations.map((conversation) => {
        return (
          <div
            key={conversation.id}
            className={`${
              deleting === conversation.id ? "hidden" : "flex"
            } flex-col p-2`}
          >
            <div className="join w-full">
              <button
                className=" btn-neutral btn-active join-item btn flex flex-1 flex-row overflow-hidden break-words text-xs"
                onClick={() => setConversation(conversation.id)}
              >
                {conversation.title}
              </button>
              <button
                className="btn-ghost btn-active join-item btn flex flex-row"
                disabled={deleting === conversation.id}
                value={conversation.id}
                onClick={(event) => {
                  setDeleting(conversation.id);
                  deleteConversation(event.currentTarget.value);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
