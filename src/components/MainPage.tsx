"use client";
import React, { useEffect, useRef, useState } from "react";
import InputArea from "./InputArea";
import MessageHandler from "./MessageHandler";
import { supabase } from "../lib/supa";
import { Themetoggle } from "./ui/Themetoggle";
import { useTheme } from "next-themes";

const MainPage: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [messageHistory, setMessageHistory] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }, [messageHistory]);

  useEffect(() => {
    const handleInserts = (payload: any) => {
      setMessageHistory((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        const isSameType = lastMessage?.payload?.type === "GPT" && payload.new.payload.type === "GPT";
        return isSameType ? [...prevMessages.slice(0, -1), payload.new] : [...prevMessages, payload.new];
      });
    };

    supabase
      .channel("message_history")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "message_history" }, handleInserts)
      .subscribe();

    supabase
      .from("message_history")
      .select("*")
      .order("created_at", { ascending: true })
      .then(({ data: message_history, error }) => {
        if (error) console.log("error", error);
        else setMessageHistory(message_history);
      });
  }, []);

  const sendMessage = async (messageToSend?: string) => {
    const message = messageToSend || inputValue;
    console.log(message);
    console.log("sending message now");
    setInputValue("");
  
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const { theme, setTheme } = useTheme();
  const mode = theme === "dark";
  const toggleTheme = () => {
    setTheme(mode ? "light" : "dark");
  };
  

  return (
    <div className="flex flex-col gap-8 h-screen max-w-5xl mx-auto">
      <div className="flex-grow overflow-auto p-4">
        {messageHistory.length === 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className="text-3xl font-bold flex justify-center items-center md:text-5xl my-4 w-full text-center">Let's search</div>
          </div>
        ) : (
          messageHistory.map((message, index) => (
            <MessageHandler key={index} message={message} sendMessage={sendMessage} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="sticky bottom-0">
        <InputArea inputValue={inputValue} setInputValue={setInputValue} sendMessage={sendMessage} />
      </div>
      <div className="absolute top-4 left-4">
      <Themetoggle/>
      </div>
  </div>
  );
};

export default MainPage;
