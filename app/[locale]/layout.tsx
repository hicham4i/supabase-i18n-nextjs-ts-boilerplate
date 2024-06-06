import LanguageChanger from '@/components/languageChanger';
import initTranslations from '../i18n';
import Script from 'next/script';
import TranslationsProvider from '@/providers/TranslationsProvider';

const i18nNamespaces = ['default'];
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/utils/classes';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});
export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: any }) {
  const { t, resources, i18n } = await initTranslations({
    locale,
    namespaces: i18nNamespaces,
  });

  return (
    <html lang={locale} className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
          integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>

      <body className="light-mode">
        <LanguageChanger defaultLocal={locale} />
        <div className="flex min-h-screen flex-col items-center justify-center">
          <main className="flex w-full flex-col items-center justify-center text-center">
            <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
              {children}
            </TranslationsProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
