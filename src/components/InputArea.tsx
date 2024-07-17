import React from "react";
import { ArrowCircleRight } from "@phosphor-icons/react";

interface InputAreaProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (messageToSend?: string) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ inputValue, setInputValue, sendMessage }) => {
  return (
    <div className="flex items-center py-3">
      <input
        type="text"
        className="flex-1 p-2 border rounded-l-md focus:outline-none focus:border-blue-500"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={() => sendMessage()} className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600">
        <ArrowCircleRight size={25} />
      </button>
    </div>
  );
};

export default InputArea;
