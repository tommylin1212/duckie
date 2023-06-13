'use client'
import hljs from 'highlight.js'
import React, { useEffect} from 'react';
import 'highlight.js/styles/base16/darcula.css';

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
export default function ChatResponse(props:{result:string,inputCode:string}) {
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            hljs.configure({languages: ['typescript']})
            hljs.highlightAll()
        }
    }, [props.result, props.inputCode]);


    const splitResult = props.result.split(/^```/gm).map((str, index) => {
        if (index % 2 === 0) {
          return str.split('\n').filter(line => line.trim() !== '').map((line, lineIndex) => <ChatBubble key={`${index}-${lineIndex}`} text={line} isCode={false} language='' />);
        } else {
          const [language, ...codeLines] = str.split('\n');
          const code = codeLines.join('\n');
          return <ChatBubble key={index} text={code} language={language} isCode={true} />;
        }
      });

  return (<>
  <div className='chat chat-end'>
      <div className='bg-gray-700 py-2 chat-bubble'>
        <div className='mockup-code bg-zinc-900 '>
        <pre className='bg-inherit'>
            <code className='bg-inherit typescript '>
                {props.inputCode}
            </code>
        </pre>
      </div>
      </div>
    </div>
    <div className='chat chat-start'>
    <div className='bg-gray-700 py-2 chat-bubble'>
    
      {splitResult.flat()}
      </div>
      </div>
      
    </>
  );
  };