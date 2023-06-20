"use client";

import { useChat } from "ai/react";
import { ChatCompletionRequestMessageRoleEnum } from "openai";
import ChatContainer from "./(Chat)/ChatContainer";

export default function MainChat() {
  const prompt = `If no other direction is given, analyze the given code for code quality issues such as performance optimizations, readability, maintainability, and potential bugs. Provide suggestions for improvement and best practices to follow. Output the optimzed code as an example. In general, talk about code. Be open to conversation and questions after the initial submission.`;
  const initialMessages = [
    {
      id: "0",
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: prompt,
    },
  ];
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages,
  });

  return (
    <ChatContainer
      messages={messages}
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
}
