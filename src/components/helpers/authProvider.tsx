import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import IUser from '../../types/user.type';
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

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
    const token = localStorage.getItem('user');
    if (token) {
      setCurrentUser(true);
    }
  }, []);



  const login = async (username: string, password: string) => {
    try {
      // Call the login function from your authentication service
      await AuthService.login(username, password);
      console.log('here');
      navigate('/home')
      setCurrentUser(true);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (e.g., display error message)
    }
  };

  const logout = () => {
    // Perform logout logic (clear user session, etc.)
    // setCurrentUser(null);
    try {
      // Call the login function from your authentication service
      AuthService.logout();
      setCurrentUser(false);
    } catch (error) {
      console.error('Log out success');
      // Handle login failure (e.g., display error message)
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await AuthService.register(username, email, password)
      navigate('/home')
      setCurrentUser(true)
    } catch (error) {
      console.log("error register ::: ", error)
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
