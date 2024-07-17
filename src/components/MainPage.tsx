"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowCircleRight } from "@phosphor-icons/react";
import { createClient } from "@supabase/supabase-js";
import MessageHandler from "./MessageHandler";
import InputArea from "./InputArea";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(URL, ANON_KEY);

type Props = {}

const MainPage = (props: Props) => {
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

    const sendMessage = (messageToSend?: string) => {
        const message = messageToSend || inputValue;
        const body = JSON.stringify({ message });
        setInputValue("");
    
        fetch("/api/backend", {
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data", data);
          })
          .catch((err) => console.log("err", err));
      };

      return (
        <div className="flex h-screen">
          <div className="flex-grow h-screen flex flex-col justify-between mx-auto max-w-4xl">
            {/* {messageHistory.map((message, index) => (
              <MessageHandler key={index} message={message.payload} sendMessage={sendMessage} />
            ))} */}
            <InputArea inputValue={inputValue} setInputValue={setInputValue} sendMessage={sendMessage} />
            <div ref={messagesEndRef} />
          </div>
        </div>
      );
}

export default MainPage