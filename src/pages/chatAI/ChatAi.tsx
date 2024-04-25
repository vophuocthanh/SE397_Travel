import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import MDEditor from '@uiw/react-md-editor';
import InputBox from './InputBox';
import './ChatWindow.css';

import logo from '@/assets/images/gemini-small.png';
import Header from '@/pages/header/Header';

const API_KEY: string = import.meta.env.VITE_GEMINI_API_KEY as string;
const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isCode?: boolean;
}

const HeaderMain: React.FC = () => {
  return (
    <div className='p-5 pt-1 mt-2 text-center text-black'>
      <h1 id='chat-header'>
        <img src={logo} alt='gemini' width={120} />
        <b style={{ marginLeft: 5 }}>Chatbot</b>
      </h1>
      <small>Experience Google’s largest and most capable AI model</small>
    </div>
  );
};

const ChatWindow: React.FC = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (chatContainerRef.current)
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async (inputText: string) => {
    if (!inputText) {
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: 'user', timestamp: new Date() },
    ]);

    setLoading(true);

    try {
      const result = await model.generateContent(inputText);
      const text = await result.response.text();

      const isCode = text.includes(' ');

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: text,
          sender: 'ai',
          timestamp: new Date(),
          isCode,
        },
      ]);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('generateContent error: ', error);
    }
  };

  return (
    <div className={`w-full h-full`}>
      <Header className='fixed top-0 z-20 flex items-center justify-between w-full px-10 mx-auto shadow-md bg-gradient-to-r from-purple-600 via-red-300 to-yellow-500' />
      <div className='flex flex-col px-8 mt-16'>
        <HeaderMain />
        <div className='mb-10 chat-container' ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message  ${
                message.sender === 'user' ? 'user' : 'ai'
              }`}
            >
              {message.isCode ? (
                <MDEditor.Markdown
                  source={message.text}
                  style={{ whiteSpace: 'pre-wrap' }}
                  className='p-2 rounded-md'
                />
              ) : (
                <>
                  <p className='message-text '>{message.text}</p>
                  <span
                    className={`time ${
                      message.sender === 'user' ? 'user' : 'ai'
                    }`}
                  >
                    {message.timestamp
                      ? dayjs(message.timestamp).format('DD.MM.YYYY HH:mm:ss')
                      : ''}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <InputBox sendMessage={sendMessage} loading={loading} />
    </div>
  );
};

export default ChatWindow;
