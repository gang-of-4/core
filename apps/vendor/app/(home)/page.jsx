import Link from "next/link"

export const metadata = {
  title: 'Vendor Page',
  description: 'Vendor Landing Page',
}

export default function Home() {
  return (
    <>
      <main className="flex min-h-full flex-col items-center gap-4">
        <h1>
          Welcome to the Vendor Landing Page
        </h1>
        <Link href="/dashboard" className="
          bg-primary
          hover:bg-primary-400
          text-white
          font-bold
          py-2
          px-4
          rounded-xl
          transition
        ">
          Go to Vendor Dashboard
        </Link>
      </main>
    </>
  )
}
