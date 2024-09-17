'use client';
import { useState, useRef, useEffect } from 'react';
import { useSearchAssistanceMutation } from '../GlobalRedux/apiSlice';

export default function Home() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi, how can I help you today?' },
  ]);
  const [userInput, setUserInput] = useState('');

  const [sendMessage, { isLoading }] = useSearchAssistanceMutation();

  // Create a ref for the bottom of the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    // Add user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: userInput },
    ]);

    try {
      // Send the message using RTK Query mutation
      const response = await sendMessage({message:userInput}).unwrap();
      console.log(response.messsage)
      // Add bot's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: response.messsage },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Sorry, something went wrong.' },
      ]);
    }

    setUserInput('');
  };

  return (
    <div className="min-h-screen bg-teal-400 grid place-content-center">
      <div className="max-w-96 max-h-96 flex flex-col gap-4 border-2 border-gray-300 p-4 rounded-lg">
        <h1 className="font-bold text-2xl text-slate-500 self-center">
          Chat with our Bot
        </h1>
        <div className="flex flex-col gap-2 bg-white text-blue-600 h-96 w-64 overflow-y-auto rounded-lg border-0.5 border-gray-300 px-4 py-1">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === 'bot' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`max-w-52 break-words ${
                  msg.sender === 'bot'
                    ? 'bg-gray-100 text-black'
                    : 'bg-blue-500 text-white'
                } p-2 rounded-lg`}
              >
                <p className="text-sm max-w-44 break-words">
                  <strong>{msg.sender === 'bot' ? 'Bot: ' : 'You: '}</strong>
                  {msg.text}
                </p>
              </div>
            </div>
          ))}
          {isLoading && <p>Bot is typing...</p>}
          {/* Dummy div to maintain scroll position */}
          <div ref={messagesEndRef} />
        </div>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="px-4 py-1 rounded-lg outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white hover:bg-white hover:text-black w-32 px-4 py-1 self-center rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}
