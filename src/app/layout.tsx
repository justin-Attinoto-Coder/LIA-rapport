import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { ThemeProvider } from '@/contexts/ThemeContext'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LIA Rapport - Frontend Developer',
  description: 'Professional internship report system for tracking LIA progress',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className={inter.className}>
        <ThemeProvider>
          <ClientLayout>
            <Navigation />
            <main className="container mx-auto px-4 py-8 md:py-12">{children}</main>
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
