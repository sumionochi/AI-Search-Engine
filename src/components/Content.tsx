import React from "react";

interface ContentProps {
  content: string;
}

const Content: React.FC<ContentProps> = ({ content }) => {
  return <div className="text-3xl md:text-4xl font-bold my-4 w-full">{content}</div>;
};

export default Content;
