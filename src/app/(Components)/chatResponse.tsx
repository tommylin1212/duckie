'use client'
import hljs from 'highlight.js'
import React, { useEffect} from 'react';
import 'highlight.js/styles/base16/darcula.css';
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';

const ChatBubble = ({ text, isCode,language }:{text:string,isCode:boolean, language:string}) => (
    <div className='m-4'>
      {isCode ? (
        <div className='mockup-code bg-zinc-900 '>
        <p>{language}</p>
        <pre className='bg-inherit'>
            <code className='bg-inherit typescript '>
        {text}
        </code>
        </pre>
        </div>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
  export default function ChatResponse({ messages }: { messages: ChatCompletionRequestMessage[] }) {
    useEffect(() => {
      if (typeof window !== 'undefined') {
        hljs.configure({languages: ['typescript']})
        hljs.highlightAll()
      }
    }, [messages]);
  
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
  
      const chatBubbles = createChatBubble(message.content, index);
  
      if (message.role === ChatCompletionRequestMessageRoleEnum.User) {
        // For user messages, create a chat-end element
        return (
          <div key={index} className='chat chat-end'>
            <div className='bg-gray-700 py-2 chat-bubble'>
              {chatBubbles}
            </div>
          </div>
        );
      } else if (message.role === ChatCompletionRequestMessageRoleEnum.Assistant) {
        // For assistant messages, create a chat-start element
        return (
          <div key={index} className='chat chat-start'>
            <div className='bg-gray-700 py-2 chat-bubble'>
              {chatBubbles}
            </div>
          </div>
        );
      }
    });
  
    return (
      <>{messageComponents}</>
    );
  };