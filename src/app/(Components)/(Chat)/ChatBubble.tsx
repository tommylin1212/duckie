"use client";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";

SyntaxHighlighter.registerLanguage("jsx", jsx);

interface ChatBubbleProps {
  content: string;
  isCode: boolean;
  language: string;
}

const ChatBubble = ({ content, isCode, language }: ChatBubbleProps) => (
  <div className="m-4">
    {isCode ? (
      <div className="mockup-code bg-zinc-900 ">
        <p>{language}</p>
        <pre className="bg-inherit">
          <code className="typescript bg-inherit ">
            <SyntaxHighlighter language="javascript" style={darcula}>
              {content}
            </SyntaxHighlighter>
          </code>
        </pre>
      </div>
    ) : (
      <p>{content}</p>
    )}
  </div>
);

export default ChatBubble;
