import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { loginUser } from '../services/auth/login';
import { verifyToken } from '../services/auth/verifyToken';

type User = {
  id: string;
  user_name: string;
  email: string;
};

type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
  login: (inputs: { user_name: string; password: string }) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const tokenData = await verifyToken();

        if (tokenData) {
          console.log('received token data', tokenData);
          setCurrentUser(tokenData);
        } else {
          setCurrentUser(null);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    console.log('service import worked!');
    verify();
  }, []);

  const login = async (inputs: { user_name: string; password: string }) => {
    try {
      const responseData = await loginUser(inputs);
      if (!responseData) {
        console.log('nothing is res data');
      }
      console.log('login worked from services', responseData);
      localStorage.setItem('token', responseData);
    } catch (err) {
      //alert(err);
      console.error(err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
