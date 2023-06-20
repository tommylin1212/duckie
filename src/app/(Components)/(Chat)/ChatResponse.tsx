import { Message } from "ai";
import { ChatCompletionRequestMessageRoleEnum } from "openai";
import MessageComponent from "./MessageComponent";

interface ChatResponseProps {
  messages: Message[];
}

const ChatResponse = ({ messages }: ChatResponseProps) => {
  const messageComponents = messages
    .filter(({ role }) => role !== ChatCompletionRequestMessageRoleEnum.System)
    .map((message) => <MessageComponent key={message.id} message={message} />);

  return <>{messageComponents}</>;
};

export default ChatResponse;
