import { 
  createContext, 
  useCallback, 
  useEffect, 
  useState, 
  useMemo 
} from 'react';
import { api, setAccessToken } from '../lib/api';

const AuthContext = createContext(undefined);
export { AuthContext };

function applyAuthPayload(payload, setUser) {
  setAccessToken(payload.accessToken);
  setUser(payload.user);
}

function clearAuth(setUser) {
  setAccessToken(null);
  setUser(null);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const response = await api.post('/auth/refresh');
      applyAuthPayload(response.data, setUser);
    } catch (error) {
      // Clear any partial auth state before rethrowing
      clearAuth(setUser);
      throw error; // preserve original error for caller
    }
  }, []);

  const login = useCallback(async (values) => {
    try {
      const response = await api.post('/auth/login', values);
      applyAuthPayload(response.data, setUser);
    } catch (error) {
      clearAuth(setUser);
      throw error;
    }
  }, []);

  const register = useCallback(async (values) => {
    try {
      const response = await api.post('/auth/register', values);
      applyAuthPayload(response.data, setUser);
    } catch (error) {
      clearAuth(setUser);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      clearAuth(setUser);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      try {
        await refreshSession(); 
      } catch {
        // Already handled inside refreshSession (clearAuth called)
      } finally {
        if (mounted) {
          setIsBootstrapping(false);
        }
      }
    }

    bootstrap();

    return () => {
      mounted = false;
    };
  }, [refreshSession]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isBootstrapping,
      login,
      register,
      logout,
      refreshSession,
    }),
    [isBootstrapping, login, logout, refreshSession, register, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}