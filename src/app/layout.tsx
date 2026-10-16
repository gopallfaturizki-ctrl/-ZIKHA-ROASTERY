import './globals.css'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'ZIKHA ROASTERY',
  description: 'Kopi premium dan jasa roasting dari ZIKHA ROASTERY.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'ZIKHA ROASTERY',
    description: 'Growing Goodness Through Coffee',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} bg-paper text-ink antialiased dark:bg-ink dark:text-paper`}>
        {children}
      </body>
    </html>
  )
}
