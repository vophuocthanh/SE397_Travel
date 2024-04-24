import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

interface InputBoxProps {
  sendMessage: (message: string) => void;
  loading: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({ sendMessage, loading }) => {
  const [input, setInput] = useState<string>('');

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      sendMessage(input);
      setInput('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className='w-full p-2'>
      {loading && <progress style={{ width: '100%' }} />}
      <input
        disabled={loading}
        type='text'
        className='form-control'
        placeholder='Type a message...'
        value={loading ? 'Loading...' : input}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default InputBox;
