import React, { useEffect, useRef, useState } from "react";
import { Plus, Layers } from "lucide-react";

interface FollowUpProps {
  content: string;
  sendMessage: (messageToSend?: string) => void;
}

const FollowUp: React.FC<FollowUpProps> = ({ content, sendMessage }) => {
  const [followUp, setFollowUp] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }, [followUp]);

  useEffect(() => {
    if (content[0] === "{" && content[content.length - 1] === "}") {
      try {
        const parsed = JSON.parse(content);
        setFollowUp(parsed.follow_up || []);
      } catch (error) {
        console.log("error parsing json", error);
      }
    }
  }, [content]);

  const handleFollowUpClick = (text: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    sendMessage(text);
  };

  return (
    <div className="my-4 w-full">
      {followUp.length > 0 && (
        <div className="text-3xl md:text-4xl font-bold flex items-center mb-4">
          <Layers className="w-7 h-7 md:w-8 md:h-8" />
          <span className="px-2">Follow-Up</span>
        </div>
      )}
      <div className="space-y-2">
        {followUp.map((text, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 border-4 bg-gray-800/10 rounded-md hover:bg-gray-700/20 cursor-pointer"
          >
            <a href="#" key={index} className="text-xl w-full p-1" onClick={(e) => handleFollowUpClick(text, e)}>
              <span>{text}</span>
            </a>
            <Plus size={20} className="ml-4" />
          </div>
        ))}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default FollowUp;

