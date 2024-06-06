'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import i18nConfig from '@/i18nConfig';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LanguageChanger({ defaultLocal }: { defaultLocal: string }) {
  const router = useRouter();
  const currentPathname = usePathname();
  const { i18n } = useTranslation();
  const handleChange = (newLocale: string) => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="absolute top-2 bg-custom z-10 right-[25px]">
        <Button variant="outline" size="icon">
          {defaultLocal}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChange('en')}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange('fr')}>Français</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange('ar')}>Arabic</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
