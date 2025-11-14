import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LIA Rapport - Frontend Developer',
  description: 'Professional internship report system for tracking LIA progress',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8 md:py-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
