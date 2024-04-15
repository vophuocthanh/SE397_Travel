import { getToken } from '@/lib/storage';
import { createContext, useState } from 'react';

export interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const initAppContext: AppContextType = {
  isAuthenticated: Boolean(getToken()),
  setIsAuthenticated: () => null,
};

export const AppContext = createContext<AppContextType>(initAppContext);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initAppContext.isAuthenticated
  );
  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
