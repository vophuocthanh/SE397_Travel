import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import MDEditor from '@uiw/react-md-editor';
import InputBox from './InputBox';
import './ChatWindow.css';

import logo from '@/assets/images/gemini-small.png';

const API_KEY: string = import.meta.env.VITE_GEMINI_API_KEY as string;
const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isCode?: boolean;
}

const Header: React.FC = () => {
  return (
    <div className='header'>
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

      const isCode = text.includes('```');

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
    <div className={`chat-window`}>
      <Header />
      <div className='chat-container' ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user' : 'ai'}`}
          >
            {message.isCode ? (
              <MDEditor.Markdown
                source={message.text}
                style={{ whiteSpace: 'pre-wrap' }}
              />
            ) : (
              <>
                <p className='message-text'>{message.text}</p>
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
      <InputBox sendMessage={sendMessage} loading={loading} />
    </div>
  );
};

export default ChatWindow;
