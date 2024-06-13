'use client';
import { useAuth } from '@/providers/AuthProvider';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();

  const logout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();
    return router.push('/login');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Dash</h2>
      <code>{JSON.stringify(user)}</code>
      <button onClick={logout}>logout</button>
    </main>
  );
}
