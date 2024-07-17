import React from "react";

interface QueryProps {
  content: string;
}

const Query: React.FC<QueryProps> = ({ content }) => {
  return <div className="text-3xl font-bold my-4 w-full">{content}</div>;
};

export default Query;
