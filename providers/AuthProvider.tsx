'use client';
import React, { createContext, useEffect, ReactElement, useState, useContext } from 'react';
import { useRouter } from 'next/navigation'; // Make sure to import from 'next/router', not 'next/navigation'
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { UserWrapper } from '@/utils/userWrapper';

type AuthProviderProps = {
  children: React.ReactNode;
};

export interface IAuthContext {
  user: UserWrapper | undefined;
}
export const AuthContext = createContext<IAuthContext>({ user: undefined });
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Changed from React.ReactNode to ReactElement
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<UserWrapper | undefined>();
  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!!session?.user) {
        const enhancedUser = new UserWrapper(session.user);
        setUser(enhancedUser);
        // router.push("/dashboard");
      } else {
        setUser(undefined);
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
