import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'it' 
      ? 'Lettera Aperta ai Developer di Guns of Glory'
      : 'Open Letter to Guns of Glory Developers',
    description: locale === 'it'
      ? 'Iniziativa della comunità per migliorare il dialogo con gli sviluppatori'
      : 'Community initiative to improve dialogue with developers',
    alternates: {
      languages: {
        'it': '/it',
        'en': '/en',
      },
    },
    openGraph: {
      title: locale === 'it' 
        ? 'Lettera Aperta ai Developer di Guns of Glory'
        : 'Open Letter to Guns of Glory Developers',
      description: locale === 'it'
        ? 'Iniziativa della comunità per migliorare il dialogo con gli sviluppatori'
        : 'Community initiative to improve dialogue with developers',
      locale: locale,
      alternateLocale: locale === 'it' ? 'en' : 'it',
    }
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased bg-gray-50">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}