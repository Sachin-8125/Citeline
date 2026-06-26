import {createContext, useCallback, useEffect, useState, useMemo} from 'react';
import {api, setAccessToken} from '../lib/api';

const AuthContext = createContext(undefined);

function applyAuthPayload(payload, setUser){
  setAccessToken(payload.accessToken);
  setUser(payload.user);
}

function clearAuth(setUser){
  setAccessToken(null);
  setUser(null);
}

export function AuthProvider({children}){
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  const refreshSession = useCallback(async() => {
    try {
      const response = await api.post('/auth/refresh');
      applyAuthPayload(response.data, setUser);
    } catch {
      clearAuth(setUser);
      throw new Error('Failed to refresh session');
    }
  },[]);

  const login = useCallback(async(values) => {
    const response = await api.post('/auth/login', values);
    applyAuthPayload(response.data, setUser);
  },[]);

  const register = useCallback(async(values) => {
    const response = await api.post('/auth/register', values);
    applyAuthPayload(response.data, setUser);
  },[]);

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
        const response = await api.post('/auth/refresh');
        if(mounted){
          applyAuthPayload(response.data, setUser);
        }
      } catch {
        if(mounted){
          clearAuth(setUser);
        }
      }finally{
        if(mounted){
          setIsBootstrapping(false);
        }
      }
    }
    bootstrap();

    return ()=> {
      mounted = false;
    };
  },[]);

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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
