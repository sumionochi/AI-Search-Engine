import React, { useState } from "react";
import { ArrowCircleRight } from "@phosphor-icons/react";
import { Loader } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface InputAreaProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (messageToSend?: string) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ inputValue, setInputValue, sendMessage }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (messageToSend?: string) => {
    setIsLoading(true);
    await sendMessage(messageToSend);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center p-4 border-4 bg-gray-800/10 rounded-lg mb-4">
      <input
        type="text"
        placeholder="Ask anything..."
        className="flex-1 p-2 border-none bg-transparent placeholder-gray-500 outline-none focus:outline-none"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        disabled={isLoading}
      />
      <button onClick={() => handleSendMessage()} className="ml-2 flex items-center justify-center w-10 h-10 bg-gray-700/30 text-white rounded-full hover:bg-gray-600/30" disabled={isLoading}>
        {isLoading ? <Loader className="animate-spin w-5 h-5 text-white" /> : <ArrowCircleRight size={24} />}
      </button>
    </div>
  );
};

export default InputArea;
