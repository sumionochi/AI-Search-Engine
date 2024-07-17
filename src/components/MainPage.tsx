"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowCircleRight } from "@phosphor-icons/react";
import { createClient } from "@supabase/supabase-js";

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


  return (
    <div>MainPage</div>
  )
}

export default MainPage