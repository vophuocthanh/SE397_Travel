import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("cfcd8278-cba5-4c25-9a85-ccf1fe3e4a0e");
  }, []);

  return null;
};

export default CrispChat;