import type { Metadata } from 'next'
import { Source_Serif_4, Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WealthBridge Consulting | Raise Your Keep Rate',
  description: 'Your Keep Rate is the share of every dollar you actually keep after tax, fees, and leakage. We raise your Keep Rate by restructuring tax, reallocating retained earnings, cutting cost drag, and fixing withdrawal policy.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${sourceSerif.variable} ${inter.variable}`}>
        {children}
        <Script
          src="https://cdn.builder.io/js/webcomponents"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
