import LanguageChanger from '@/components/languageChanger';
import initTranslations from '../i18n';
import Script from 'next/script';
import TranslationsProvider from '@/providers/TranslationsProvider';

const i18nNamespaces = ['default'];
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ThemeChanger } from '@/components/themeChanger';
import AuthProvider from '@/providers/AuthProvider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});
type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};
const RootLayout: React.FC<RootLayoutProps> = async ({ children, params: { locale } }) => {
  const { t, resources, i18n } = await initTranslations({
    locale,
    namespaces: i18nNamespaces,
  });

  return (
    <html lang={locale}>
      <head></head>

      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <main className="flex w-full flex-col items-center justify-center text-center">
            <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
              <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                <AuthProvider>
                  <ThemeChanger />
                  <LanguageChanger defaultLocal={locale} />
                  {children}
                </AuthProvider>
              </ThemeProvider>
            </TranslationsProvider>
          </main>
        </div>
      </body>
    </html>
  );
};
export default RootLayout;
