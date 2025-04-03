import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// import axios from 'axios';

// const socket = io("http://127.0.0.1:5001");
const ChatBox = ({ text }) => {
  const [messages, setMessages] = useState([]);
  // const [streamedText, setStreamedText] = useState("");
  // const streambool = useRef(false);

    useEffect(() => {
      console.log("Updated messages:", messages);
    }, [messages]);

  // useEffect(() => {
  //   socket.on("stream_complete", () => {
  //     if(streamedText){
  //       console.log("check here: ",streamedText)
  //     setMessages((prev) => [...prev, { sender: "bot", text: streamedText }]);}
  //     streambool.current = false;
  //     setStreamedText("");
  //   });

  //   socket.on("data", (data) => {
  //     streambool.current = true;
  //     setStreamedText((prev) => prev + data.char);
  //   });

  //   return () => {
  //     socket.off("stream_complete");
  //     socket.off("data");
  //   };
  // }, [streamedText]);

  // useEffect(() => {
  //   if (text != "") {
  //     streambool.current = false;
  //     setStreamedText("");
  //     setMessages((prev) => [...prev, { sender: "user", text: text }]);
  //     // socket.emit("data", { question: text });
  //     fetch("http://127.0.0.1:5001/api/query", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         query: text
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => console.log("Model updated on backend:", data))
  //       .catch((err) => console.error("Error updating model:", err));

  //   }
  // }, [text]);

  useEffect(() => {
    if (text !== "") {
      setMessages((prev) => [...prev, { sender: "user", text: text }]);
  
      fetch(`${import.meta.env.VITE_API_URL}/api/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: text
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Model updated on backend:", data);
          
          // Check if the response contains a valid message
          if (data.response) {
            setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
          } else {
            setMessages((prev) => [...prev, { sender: "bot", text: "No response received." }]);
          }
        })
        .catch((err) => {
          console.error("Error updating model:", err);
          setMessages((prev) => [...prev, { sender: "bot", text: "Error processing query." }]);
        });
  
    }
  }, [text]);  

  const handleBeforeUnload = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Page is being refreshed" }),
      keepalive: true, // Ensures the request is sent even if the page is closing
    });
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="flex flex-col p-4 space-y-4 h-[calc(100vh-8rem)] overflow-y-auto bg-white text-white shadow-xl">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.sender !== "bot" ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`max-w-[75%] px-4 py-2 rounded-lg ${
              msg.sender === "bot"
                ? "bg-gray-700 text-white"
                : "bg-gray-500 text-white"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
      {/* {
      streambool.current && streamedText && (
        <div className="flex justify-start">
          <div className="max-w-[75%] px-4 py-2 rounded-lg bg-gray-700 text-gray-200">
            {streamedText}
          </div>
        </div>
      )} */}
    </div>
  );
};
export default ChatBox;
