import Link from "next/link";
import { paths } from "ui/paths";

export const metadata = {
  title: 'Vendor Page',
  description: 'Vendor Landing Page',
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1>
        Vendor Landing Page
      </h1>
      <Link href={paths.auth.login} className="underline hover:text-blue-500">
        Login
      </Link>
      <Link href={paths.vendor.dashboard.index} className="underline hover:text-blue-500">
        Dashboard
      </Link>
    </main>
  )
}
