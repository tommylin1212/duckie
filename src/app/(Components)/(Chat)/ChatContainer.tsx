import { Message } from "ai";
import ChatResponse from "./ChatResponse";
import ChatInput from "./ChatInput";

interface ChatContainerProps {
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ChatContainer = ({ messages, input, handleInputChange, handleSubmit }: ChatContainerProps) => (
  <div className="pt-64px flex flex-1 flex-col bg-base-300">
    <div className="flex flex-1 flex-col bg-base-200">
      <ChatResponse messages={messages} />
    </div>
    <ChatInput input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
  </div>
);

export default ChatContainer;
