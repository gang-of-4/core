import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Suspense } from "react";
import Loading from "./loading";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

async function getCategories() {
  const res = await fetch(
    `${process.env.CATALOG_API_URL}/categories`,
    { next: { revalidate: 0 } }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return data;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const categories = await getCategories();
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<Loading />}>
            <Header categories={categories}>
              {children}
            </Header>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
