import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for client-side authentication
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@medlecture.com',
    password: 'admin123',
    displayName: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'student@medlecture.com',
    password: 'student123',
    displayName: 'Student User',
    role: 'student'
  },
  {
    id: '3',
    email: 'instructor@medlecture.com',
    password: 'instructor123',
    displayName: 'Instructor User',
    role: 'instructor'
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const clearError = () => setError(null);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setLoading(true);
      clearError();
      
      // Check if email already exists
      if (MOCK_USERS.find(user => user.email === email)) {
        throw new Error('Email already registered');
      }
      
      // Create new user
      const newUser = {
        id: (MOCK_USERS.length + 1).toString(),
        email,
        displayName,
        role: 'student'
      };
      
      // In a real app, this would be stored in a database
      MOCK_USERS.push({...newUser, password});
      
      // Store user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setCurrentUser(newUser);
      
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      clearError();
      
      // Find user
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Store user in localStorage (without password)
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      setCurrentUser(userWithoutPassword);
      
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
  };

  const value = {
    currentUser,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
 