import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { api, setAccessToken } from '../lib/api';

const AuthContext = createContext(undefined);
export { AuthContext };

function applyAuthPayload(payload, setUser, setToken) {
  setAccessToken(payload.accessToken);
  setUser(payload.user);
  setToken(payload.accessToken);
}

function clearAuth(setUser, setToken) {
  setAccessToken(null);
  setUser(null);
  setToken(null);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setToken] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const response = await api.post('/auth/refresh');
      applyAuthPayload(response.data, setUser, setToken);
    } catch (error) {
      clearAuth(setUser, setToken);
      throw error;
    }
  }, []);

  const login = useCallback(async (values) => {
    try {
      const response = await api.post('/auth/login', values);
      applyAuthPayload(response.data, setUser, setToken);
    } catch (error) {
      clearAuth(setUser, setToken);
      throw error;
    }
  }, []);

  const register = useCallback(async (values) => {
    try {
      const response = await api.post('/auth/register', values);
      applyAuthPayload(response.data, setUser, setToken);
    } catch (error) {
      clearAuth(setUser, setToken);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      clearAuth(setUser, setToken);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      try {
        await refreshSession();
      } catch {
        // Already handled in refreshSession
      } finally {
        if (mounted) {
          setIsBootstrapping(false);
        }
      }
    }

    bootstrap();
    return () => { mounted = false; };
  }, [refreshSession]);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(user),
      isBootstrapping,
      login,
      register,
      logout,
      refreshSession,
    }),
    [accessToken, isBootstrapping, login, logout, refreshSession, register, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}