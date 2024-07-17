import React, { useState } from "react";
import { ArrowCircleRight } from "@phosphor-icons/react";
import { Loader } from "lucide-react";

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
    <div className="flex items-center py-3 mb-4 bg-white shadow-black rounded-md shadow-md px-4">
      <input
        type="text"
        className="flex-1 p-2 border rounded-l-md focus:outline-none focus:border-blue-500"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        disabled={isLoading}
      />
      <button onClick={() => handleSendMessage()} className="bg-slate-700 text-white p-2 rounded-r-md hover:bg-slate-600" disabled={isLoading}>
        {isLoading ? <Loader size={25} color="inherit" className=" animate-spin text-white" /> : <ArrowCircleRight size={25} />}
      </button>
    </div>
  );
};

export default InputArea;
