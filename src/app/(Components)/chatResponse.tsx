'use client'
//import hljs from 'highlight.js'
//import { useEffect } from 'react';
//import 'highlight.js/styles/base16/darcula.css';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Highlight from 'react-highlight';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import {darcula} from 'react-syntax-highlighter/dist/esm/styles/prism';
SyntaxHighlighter.registerLanguage('jsx', jsx);
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';

const ChatBubble = ({ text, isCode, language }: { text: string, isCode: boolean, language: string }) => (
  <div className='m-4'>
    {isCode ? (
      <div className='mockup-code bg-zinc-900 '>
        <p>{language}</p>
        <pre className='bg-inherit'>
          <code className='bg-inherit typescript '>
          <SyntaxHighlighter language="javascript" style={darcula}>
              {text}
            </SyntaxHighlighter>
          </code>
        </pre>
      </div>
    ) : (
      <p>{text}</p>
    )}
  </div>
);
export default function ChatResponse({ messages }: { messages: ChatCompletionRequestMessage[] }) {
  // useEffect(() => {
  //   if (messages.length>1) {
  //     hljs.configure({ languages: ['typescript'] })
  //     hljs.highlightAll()
  //   }
  // }, [messages]);
  // Create a new function to handle splitting the content and creating chat bubbles
  const createChatBubble = (content: string, index: number) => {
    return content.split(/^```/gm).map((str, subIndex) => {
      if (subIndex % 2 === 0) {
        return str.split('\n').filter(line => line.trim() !== '').map((line, lineIndex) => <ChatBubble key={`${index}-${subIndex}-${lineIndex}`} text={line} isCode={false} language='' />);
      } else {
        const [language, ...codeLines] = str.split('\n');
        const code = codeLines.join('\n');
        return <ChatBubble key={`${index}-${subIndex}`} text={code} language={language} isCode={true} />;
      }
    });
  };

  // Map over the messages array and create chat bubbles depending on the role of each message
  const messageComponents = messages.map((message, index) => {
    if (message.role === ChatCompletionRequestMessageRoleEnum.System) {
      // Ignore system messages
      return null;
    }

    const chatBubbles = createChatBubble(message.content || '', index);

    if (message.role === ChatCompletionRequestMessageRoleEnum.User) {
      // For user messages, create a chat-end element
      return (
        <div key={index} className='chat chat-end '>
          <div className='bg-gray-700 py-2 chat-bubble max-w-[50%]'>
            {chatBubbles}
          </div>
        </div>
      );
    } else if (message.role === ChatCompletionRequestMessageRoleEnum.Assistant) {
      // For assistant messages, create a chat-start element
      return (
        <div key={index} className='chat chat-start'>
          <div className='bg-gray-700 py-2 chat-bubble max-w-[50%]'>
            {chatBubbles}
          </div>
        </div>
      );
    }
    else {
      return (
        <div key={index} className='chat chat-start'>
          <div className='bg-gray-700 py-2 chat-bubble'>
            {chatBubbles}
          </div>
        </div>

      )
    }
  });

  return (
    <>{messageComponents}</>
  );
};