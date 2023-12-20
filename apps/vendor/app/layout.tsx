import { Inter } from 'next/font/google'
import './globals.css'
import { ContextProviders } from '@/components/ContextProviders'
import { Suspense } from 'react'
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

const authApiURL = process.env.AUTH_API_URL;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProviders
          authApiURL={authApiURL}
        >
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </ContextProviders>
      </body>
    </html>
  )
}
