import { Progress } from '@/components/ui/progress';
import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';

interface InputBoxProps {
  sendMessage: (message: string) => void;
  loading: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({ sendMessage, loading }) => {
  const [input, setInput] = useState<string>('');
  const [progress, setProgress] = React.useState(13);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      sendMessage(input);
      setInput('');
    }
  };

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      if (currentProgress <= 100) {
        setProgress(currentProgress);
        currentProgress++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className='fixed w-full p-2 bottom-2'>
      {loading && <Progress className='w-full' value={progress} />}
      <input
        disabled={loading}
        type='text'
        className='z-50 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        placeholder='Type a message...'
        value={loading ? 'Loading...' : input}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default InputBox;
