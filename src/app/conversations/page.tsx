'use client'
import { useState, useCallback, useEffect } from 'react';
import ChatResponse from '../(Components)/chatResponse';
import Navbar from '../(Components)/navbarMain';
import ConversationDrawer from '../(Components)/conversationDrawer';
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';

interface AnalysisResponse {
  analysis: string;
}




export default function Page() {
  const prompt = `If no other direction is given, analyze the given code for code quality issues such as performance optimizations, readability, maintainability, and potential bugs. Provide suggestions for improvement and best practices to follow. Output the optimzed code as an example. In general, talk about code. Be open to conversation and questions after the initial submission.`;

  const systemMessage = { role: ChatCompletionRequestMessageRoleEnum.System, content: prompt };
  const [codeInput, setCodeInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([systemMessage]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        fetch('/analyze-code-with-history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages: messages }),
          })
          .then((response) => response.json())
          .then((data) => {
            setAnalysisResult(data.analysis);
            setMessages([...messages, { role: ChatCompletionRequestMessageRoleEnum.Assistant, content: data.analysis }]);
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
    if(messages.length > 1) {
      fetchAnalysis();
    }
  }, [currentPrompt]);

  return (
    <>
      <Navbar />
      <main className="flex flex-col pl-64 h-[calc(100vh-64px)] flex-grow bg-base-300">
        <ConversationDrawer />
        <div className='flex pt-64px flex-1 flex-col bg-base-300'>
          <div className='flex flex-1 flex-col bg-base-200'>
            {analysisResult && (
              <ChatResponse messages={messages} />
            )}
          </div>
          <div className='flex flex-none justify-center p-4 bg-base-100'>
            <form className='flex w-full ' onSubmit={(e)=>{
              e.preventDefault();
              setMessages([...messages, { role: ChatCompletionRequestMessageRoleEnum.User, content: codeInput }]);
              setCurrentPrompt(codeInput);
              setCodeInput('');
              
            }}>
              <textarea
                className="textarea textarea-bordered textarea-lg w-full"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                
              />
              <div className='flex flex-col justify-center p-2'>
                <button className="btn btn-neutral" type="submit" >Analyze Code</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}