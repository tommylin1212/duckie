"use client";

import { Message, useChat } from "ai/react";
import { ChatCompletionRequestMessageRoleEnum } from "openai";
import ChatContainer from "./(Chat)/ChatContainer";
import { useEffect, useMemo } from "react";
import {
  createConversation,
  createMessage,
  getConversationByIdWithMessages,
  getNewestConversationByClerkId,
  upsertMessageByMessageIdAndConversationId,
} from "@/Utils/DB/operations";
import { useUser } from "@clerk/nextjs";

interface MainChatProps {
  currentConversation: string;
  setConversation: (conversationId: string) => void;
}

async function insertMessageAsync(message: Message, conversationId: string) {
  await createMessage({
    messageId: message.id,
    content: message.content,
    role: message.role,
    conversation: { connect: { id: conversationId } },
  });
}

async function createConversationAsync(
  conversationTitle: string,
  userId: string
) {
  const conversation = await createConversation({
    title: conversationTitle,
    user: { connect: { clerkId: userId } },
  });
  return conversation;
}

export default function MainChat(props: MainChatProps) {
  const prompt = `If no other direction is given, analyze the given code for code quality issues such as performance optimizations, readability, maintainability, and potential bugs. Provide suggestions for improvement and best practices to follow. Output the optimzed code as an example. In general, talk about code. Be open to conversation and questions after the initial submission.`;
  const { currentConversation, setConversation } = props;
  const { user } = useUser();
  const initialMessages = useMemo(
    () => [
      {
        id: "0",
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: prompt,
      },
    ],
    [prompt]
  );
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({ initialMessages });

  useEffect(() => {
    setConversation(currentConversation);
    async function loadConversationAsync(conversationId: string) {
      const conversation = await getConversationByIdWithMessages(
        conversationId
      );
      if (conversation) {
        const tempMessages = conversation.messages.map((message) => {
          let role: "user" | "system" | "assistant";
          if (
            message.role === "user" ||
            message.role === "system" ||
            message.role === "assistant"
          ) {
            role = message.role;
          } else {
            role = "user"; // Assign a default role if the value is invalid
            // You can also throw an error or handle the invalid value in a different way if desired
          }
          return {
            id: message.messageId,
            role: role,
            content: message.content,
          };
        });
        setMessages(tempMessages);
      }
    }
    if (currentConversation !== "") {
      loadConversationAsync(currentConversation);
    }
    if (currentConversation === "") {
      setMessages(initialMessages);
    }
  }, [currentConversation, initialMessages, setConversation, setMessages]);

  // effect to create the conversation on the first user message
  // it will be triggered when the messages array is updated and is length 2
  // it will have role of user
  // messages array updates right away as the assistant responds, it will change the length
  // need to take that into accout
  // no messages can be created until the conversation is created
  // need to create the conversation and then create the message
  //use the createConversationAsync function
  useEffect(() => {
    async function createConversationAndMessageAsync(
      userId: string,
      conversationTitle: string
    ) {
      if (messages.length === 2 && messages[1].role === "user") {
        const conversation = await createConversationAsync(
          conversationTitle,
          userId
        );
        await insertMessageAsync(messages[1], conversation.id);
        setConversation(conversation.id);
      }
    }
    if (user && messages.length > 1) {
      //first three words of the message
      const conversationTitle = messages[1].content
        .split(" ")
        .slice(0, 3)
        .join(" ");
      createConversationAndMessageAsync(user.id, conversationTitle);
    }
  }, [messages, setConversation, user]);

  // effect to add all subsequent messages to the conversation
  // it will be triggered when the messages array is updated and is length greater than 2
  // it will have role of user or assistant
  // messages array updates right away as the assistant responds, it will change the length wait for isLoading to be false
  // need to take that into account
  useEffect(() => {
    async function upsertMessageAsync(
      message: Message,
      conversationId: string
    ) {
      if (conversationId === "" && user) {
        //look up the latest conversation for the user
        //there should always be a conversation for the user

        const conversation = await getNewestConversationByClerkId(user.id);
        if (conversation[0]) {
          conversationId = conversation[0].id;
        }
      }
      await upsertMessageByMessageIdAndConversationId(
        message.id,
        conversationId,
        {
          content: message.content,
          role: message.role,
          conversation: { connect: { id: conversationId } },
          messageId: message.id,
        }
      );
    }
    //for assistant messages
    if (messages.length > 2 && !isLoading) {
      upsertMessageAsync(messages[messages.length - 1], currentConversation);
    }
    //for user messages
    if (messages.length > 2 && messages[messages.length - 1].role === "user") {
      upsertMessageAsync(messages[messages.length - 1], currentConversation);
    }
  }, [messages, isLoading, currentConversation, user]);

  return (
    <ChatContainer
      messages={messages}
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
}
