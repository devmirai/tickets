import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, LoginCredentials, RegisterData, AuthContextType } from '../types/auth';
import { authService } from '../services/authService';
import { message } from 'antd';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      const user = await authService.login(credentials);
      if (user) {
        setUser(user);
        message.success('¡Bienvenido de vuelta!');
        return true;
      } else {
        message.error('Credenciales incorrectas');
        return false;
      }
    } catch (error) {
      message.error('Error al iniciar sesión');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const user = await authService.register(data);
      if (user) {
        setUser(user);
        message.success('¡Cuenta creada exitosamente!');
        return true;
      }
      return false;
    } catch (error: any) {
      message.error(error.message || 'Error al crear la cuenta');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    message.success('Sesión cerrada');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
