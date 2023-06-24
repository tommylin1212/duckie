"use client";

type ConversationDrawerConversation = {
  id: string;
  title: string;
};
type ConversationDrawerProps = {
  conversations: ConversationDrawerConversation[];
  setConversation: (conversationId: string) => void;
  deleteConversation: (conversationId: string) => void;
};

export default function ConversationDrawer(props: ConversationDrawerProps) {
  return (
    <div className="fixed left-0 flex h-full w-64 flex-grow flex-col overflow-y-scroll border-r bg-base-200">
      <div className="navbar min-h-8 sticky top-0 z-10 h-10 justify-center bg-base-200">
        Conversations
      </div>
      <div className="flex flex-col  p-2">
        <button
          className="btn-ghost btn-active btn"
          onClick={() => props.setConversation("")}
        >
          {"Start New Conversation"}
        </button>
      </div>
      {props.conversations.map((conversation) => {
        return (
          <div key={conversation.id} className="flex flex-col p-2">
            <div className="join w-full">
              <button
                className=" btn-neutral btn-active join-item btn flex flex-1 flex-row overflow-hidden break-all"
                onClick={() => props.setConversation(conversation.id)}
              >
                {conversation.title}
              </button>
              <button
                className="btn-ghost btn-active join-item btn flex flex-row"
                value={conversation.id}
                onClick={(event) =>
                  props.deleteConversation(event.currentTarget.value)
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
