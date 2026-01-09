import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'GoG Player Assembly - Piattaforma Feedback Community',
  description: 'Piattaforma strutturata per il feedback della community che trasforma le preoccupazioni dei giocatori in richieste tecnicamente valide per gli sviluppatori di Guns of Glory.',
  keywords: ['Guns of Glory', 'GoG', 'Player Assembly', 'Community', 'Feedback', 'Gaming'],
  authors: [{ name: 'GoG Player Assembly' }],
  creator: 'GoG Player Assembly',
  publisher: 'GoG Player Assembly',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gog-player-assembly.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GoG Player Assembly - Piattaforma Feedback Community',
    description: 'Trasformare il feedback della community in richieste di sviluppo attuabili',
    url: 'https://gog-player-assembly.vercel.app',
    siteName: 'GoG Player Assembly',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GoG Player Assembly',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GoG Player Assembly - Piattaforma Feedback Community',
    description: 'Trasformare il feedback della community in richieste di sviluppo attuabili',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [
      { url: '/icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
