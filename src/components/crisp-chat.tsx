import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure(import.meta.env.VITE_CRISP_APP_ID);
  }, []);

  return null;
};

export default CrispChat;
