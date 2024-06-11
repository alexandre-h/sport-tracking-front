import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { checkTokenValidity } from '../../utils/auth';
import { removeToken } from '../../services/token.service';

interface AuthProviderProps {
  children: ReactNode; // Indicates that the component accepts children
}

interface AuthContextType {
  currentUser: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const isValid = await checkTokenValidity();
      if (!isValid) {
        removeToken();
        setCurrentUser(false);
        navigate('/login');
      }
    };

    verifyToken();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (token) {
      setCurrentUser(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await AuthService.login(username, password);
      navigate('/home')
      setCurrentUser(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setCurrentUser(false);
    } catch (error) {
      console.error('Log out failed: ', error);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await AuthService.register(username, email, password)
      navigate('/home')
      setCurrentUser(true)
    } catch (error) {
      console.log("error when register : ", error)
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
