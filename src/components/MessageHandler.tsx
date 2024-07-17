import React, { memo } from "react";
import Query from "./Query";
import Sources from "./Sources";
import VectorCreation from "./VectorCreation";
import Heading from "./Heading";
import GPT from "./GPT";
import FollowUp from "./FollowUp";

interface MessageHandlerProps {
  message: { payload: { type: string; content: string } };
  sendMessage: (messageToSend?: string) => void;
}

const MessageHandler: React.FC<MessageHandlerProps> = memo(({ message, sendMessage }) => {
  const { type, content } = message.payload;

  const COMPONENT_MAP: Record<string, React.FC<any>> = {
    Query,
    Sources,
    VectorCreation,
    Heading,
    GPT,
    FollowUp,
  };

  const Component = COMPONENT_MAP[type];
  return Component ? <Component content={content} sendMessage={sendMessage} /> : null;
});

export default MessageHandler;
