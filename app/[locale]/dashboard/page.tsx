'use client';
import TranslationsProvider from '@/providers/TranslationsProvider';
import { createClient } from '@/utils/supabase/client';
import { error } from 'console';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
const i18nNamespaces = ['default'];

export default function Home({ params: { locale } }: any) {
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const session = await supabase.auth.getSession();
      const user = session.data?.session?.user;
      if (!!user) setUser(user);
      console.log(`🚀 ~~~~~~~ user:`, user);
    };
    fetchUser();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Dash</h2>
      <code>{JSON.stringify(user)}</code>
    </main>
  );
}
