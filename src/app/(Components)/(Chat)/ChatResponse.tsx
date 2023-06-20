import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { Message } from "ai";
import ChatBubble from "./ChatBubble";
import { JSX } from "react";

interface ChatResponseProps {
  messages: Message[];
}

const ChatResponse = ({ messages }: ChatResponseProps) => {
  const createChatBubble = (messageContent: string, messageId: string) => {
    const contentArr = messageContent.split(/^```/gm);
    const chatBubbles: JSX.Element[] = [];

    contentArr.forEach((content, i) => {
      content = content.trim();

      if (content) {
        if (i % 2 === 0) {
          const lines = content
            .split("\n")
            .filter((line) => line.trim() !== "");

          lines.forEach((line, j) => {
            chatBubbles.push(
              <ChatBubble
                key={`bubble-${i}-${j}`}
                content={line}
                isCode={false}
                language=""
              />
            );
          });
        } else {
          const [language, ...codeLines] = content.split("\n");
          const code = codeLines.join("\n");

          chatBubbles.push(
            <ChatBubble
              key={`bubble-${i}-${language || ""}`}
              content={code}
              language={language}
              isCode={true}
            />
          );
        }
      }
    });

    return chatBubbles;
  };

  const messageComponents = messages
    .filter(({ role }) => role !== ChatCompletionRequestMessageRoleEnum.System)
    .map(({ content, id: messageId, role }) => {
      const messageSideClass =
        role === ChatCompletionRequestMessageRoleEnum.User
          ? "chat-end"
          : "chat-start";

      return (
        <div key={messageId} className={`chat ${messageSideClass}`}>
          <div className="chat-bubble max-w-[50%] bg-gray-700 py-2">
            {createChatBubble(content || "", messageId || "")}
          </div>
        </div>
      );
    });

  return <>{messageComponents}</>;
};

export default ChatResponse;
