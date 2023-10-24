import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Vendor Page',
  description: 'Vendor Landing Page',
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1>
        Vendor Landing Page
      </h1>
      <Link href="/auth/jwt/login" className="underline hover:text-blue-500">
        Login
      </Link>
      <Link href="/dashboard" className="underline hover:text-blue-500">
        Dashboard
      </Link>
    </main>
  )
}
