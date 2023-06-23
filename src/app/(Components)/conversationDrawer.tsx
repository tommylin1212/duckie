'use client'




type ConversationDrawerConversation = {
  id: string;
  title: string;
}
type ConversationDrawerProps = {
  conversations: ConversationDrawerConversation[];
  setConversation: (conversationId: string) => void;
}

export default function ConversationDrawer(props: ConversationDrawerProps) {
  return (
    <div className="fixed left-0 flex h-full w-64 flex-grow flex-col overflow-y-scroll border-r bg-base-200">
      <div className="navbar min-h-8 sticky top-0 z-10 h-10 justify-center bg-base-200">
        Conversations
        </div>
        {props.conversations.map((conversation) => {
          return (
            <div key={conversation.id} className="flex flex-col  p-2">
              <button className="btn btn-active btn-neutral" onClick={() => props.setConversation(conversation.id)}>{conversation.title}</button>
            </div>
          )
        }
        )}
      
    </div>
  );
}
