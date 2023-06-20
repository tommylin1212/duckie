import { JSX } from "react";
import ChatBubble from "./ChatBubble";

interface MessageBubbleProps {
  content: string;
  messageId: string;
}

const MessageBubble = ({ content, messageId }: MessageBubbleProps) => {
  const contentArr = content.split(/^```/gm);
  const chatBubbles: JSX.Element[] = [];

  contentArr.forEach((content, i) => {
    content = content.trim();

    if (content) {
      if (i % 2 === 0) {
        const lines = content.split("\n").filter((line) => line.trim() !== "");
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

  return <>{chatBubbles}</>;
};

export default MessageBubble;
