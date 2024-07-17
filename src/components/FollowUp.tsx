import React, { useEffect, useRef, useState } from "react";
import { Stack } from "@phosphor-icons/react";

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
    <>
      {followUp.length > 0 && (
        <div className="text-3xl font-bold my-4 w-full flex">
          <Stack size={32} /> <span className="px-2">Follow-Up</span>
        </div>
      )}
      {followUp.map((text, index) => (
        <a href="#" key={index} className="text-xl w-full p-1" onClick={(e) => handleFollowUpClick(text, e)}>
          <span>{text}</span>
        </a>
      ))}
      <div ref={messagesEndRef} />
    </>
  );
};

export default FollowUp;
