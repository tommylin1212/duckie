import { Message } from "ai";
import { ChatCompletionRequestMessageRoleEnum } from "openai";
import MessageBubble from "./MessageBubble";

interface MessageComponentProps {
  message: Message;
}

const MessageComponent = ({ message: { content, id, role } }: MessageComponentProps) => {
  const messageSideClass =
    role === ChatCompletionRequestMessageRoleEnum.User
      ? "chat-end"
      : "chat-start";

  return (
    <div key={id} className={`chat ${messageSideClass}`}>
      <div className="chat-bubble max-w-[50%] bg-gray-700 py-2">
        <MessageBubble content={content || ""} messageId={id || ""} />
      </div>
    </div>
  );
};

export default MessageComponent;
