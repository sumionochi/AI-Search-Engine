import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface GPTProps {
  content: string;
}

const GPT: React.FC<GPTProps> = ({ content }) => (
  <ReactMarkdown
    className="prose mt-1 w-full break-words prose-p:leading-relaxed"
    remarkPlugins={[remarkGfm]}
    components={{
      a: ({ node, ...props }) => <a {...props} style={{ color: "blue", fontWeight: "bold" }} />,
    }}
  >
    {content}
  </ReactMarkdown>
);

export default GPT;
