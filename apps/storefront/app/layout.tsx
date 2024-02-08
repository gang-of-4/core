import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Suspense } from "react";
import Loading from "./loading";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

const authApiURL = process.env.AUTH_API_URL;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers authApiURL={authApiURL}>
          <Suspense fallback={<Loading />}>
            <Header>
              {children}
            </Header>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
