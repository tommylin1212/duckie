import { Message } from "ai";
import ChatResponse from "./ChatResponse";
import ChatInput from "./ChatInput";

interface ChatContainerProps {
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ChatContainer = ({
  messages,
  input,
  handleInputChange,
  handleSubmit,
}: ChatContainerProps) => (
  <div className="flex flex-grow flex-col bg-base-300 overflow-y-scroll max-h-[calc(100vh-64px)]">
    <div className="flex flex-grow flex-col bg-base-200">
      <ChatResponse messages={messages} />
    </div>
    <ChatInput
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  </div>
);

export default ChatContainer;
