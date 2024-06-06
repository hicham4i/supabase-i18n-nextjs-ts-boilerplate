'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import i18nConfig from '@/i18nConfig';

export default function LanguageChanger({ defaultLocal }: { defaultLocal: string }) {
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e: any) => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (defaultLocal === i18nConfig.defaultLocale) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${defaultLocal}`, `/${newLocale}`));
    }

    router.refresh();
  };

  return (
    <select className=" absolute top-4 bg-custom z-10 right-[25px]" onChange={handleChange} value={defaultLocal}>
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="ar">Arabic</option>
    </select>
  );
}
