import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1>
        Vendor Landing Page
      </h1>
      <Link href="/login" className="underline hover:text-blue-500">
        Login
      </Link>
      <Link href="/signup" className="underline hover:text-blue-500">
        Sign up
      </Link>
    </main>
  )
}
