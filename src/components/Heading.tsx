import React from "react";
import { ChatCenteredDots } from "@phosphor-icons/react";

interface HeadingProps {
  content: string;
}

const Heading: React.FC<HeadingProps> = ({ content }) => {
  return (
    <div className="text-3xl font-bold my-4 w-full flex">
      <ChatCenteredDots size={32} />
      <span className="px-2">{content}</span>
    </div>
  );
};

export default Heading;
