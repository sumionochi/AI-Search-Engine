import React from "react";
import { MessageSquareText } from "lucide-react";

interface HeadingProps {
  content: string;
}

const Heading: React.FC<HeadingProps> = ({ content }) => {
  return (
    <div className="text-3xl md:text-4xl items-center font-bold my-4 w-full flex">
      <MessageSquareText className="w-7 h-7 md:w-8 md:h-8"/>
      <span className="px-2">{content}</span>
    </div>
  );
};

export default Heading;
