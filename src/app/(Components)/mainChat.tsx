'use client'

import ChatResponse from './chatResponse';
import { useChat } from "ai/react";
import { ChatCompletionRequestMessageRoleEnum } from "openai";


export default function MainChat() {
    const prompt = `If no other direction is given, analyze the given code for code quality issues such as performance optimizations, readability, maintainability, and potential bugs. Provide suggestions for improvement and best practices to follow. Output the optimzed code as an example. In general, talk about code. Be open to conversation and questions after the initial submission.`;
    const initialMessages = [{id:'0', role: ChatCompletionRequestMessageRoleEnum.System, content: prompt }];   
    const { messages, input, handleInputChange, handleSubmit } = useChat({initialMessages})
    return (
        <div className='flex pt-64px flex-1 flex-col bg-base-300'>
          <div className='flex flex-1 flex-col bg-base-200'>
            
              <ChatResponse messages={messages} />
            
          </div>
          <div className='flex flex-none justify-center p-4 bg-base-100'>
            <form className='flex w-full ' onSubmit={handleSubmit}>
              <textarea
                className="textarea textarea-bordered textarea-lg w-full"
                value={input}
                onChange={handleInputChange}
                
              />
              <div className='flex flex-col justify-center p-2'>
                <button className="btn btn-neutral" type="submit" >Analyze Code</button>
              </div>
            </form>
          </div>
        </div>
    )
}