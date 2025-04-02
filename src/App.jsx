import React, { useState } from "react";
import ChatInput from "./components/ChatInput";
import ChatBox from "./components/ChatBox";
// import { SidebarWithSearch } from "./components/slidebar";

const App = () => {
  const [text, setText] = useState("");

  const handleSend = (newText) => {
    // console.log(newText)
    setText(newText);
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gray-400 text-white">
      {/* <div className="flex"> */}
        {/* <div className="">
          <SidebarWithSearch></SidebarWithSearch>
        </div> */}
        {/* <div className="w-full flex flex-col"> */}
          <header className="bg-gray-200 p-4 text-center text-xl font-bold text-gray-700">
            T-GPT
          </header>
          <ChatBox className="row-start-1" text={text} />
          <ChatInput className="mt-auto row-end-1" onSend={handleSend} />
        {/* </div> */}
      </div>
    // </div>
  );
};

export default App;
