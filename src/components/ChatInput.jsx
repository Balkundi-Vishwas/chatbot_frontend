import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="fixed  bottom-0 left-0 w-full p-4 flex items-center bg-gray-200">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 text-white bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <button
        onClick={handleSend}
        className="ml-4 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
