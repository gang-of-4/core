import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Suspense } from "react";
import Loading from "./loading";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

// const categories = fetch(`${process.env.CATALOG_API_URL}/categories`).then((res) => res.json());

const categories = [
  {
    id: "1",
    name: "Sedans",
    slug: "sedans",
    banner: {
      url: "https://via.placeholder.com/1500x500",
      alt: "Sedans"
    },
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    logo: {
      url: "https://via.placeholder.com/500x500",
      alt: "Sedans"
    },
    isActive: true
  },
  {
    id: "2",
    name: "SUVs",
    slug: "suvs",
    banner: {
      url: "https://via.placeholder.com/1500x500",
      alt: "SUVs"
    },
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    logo: {
      url: "https://via.placeholder.com/500x500",
      alt: "SUVs"
    },
    isActive: true
  },
  {
    id: "3",
    name: "Trucks",
    slug: "trucks",
    banner: {
      url: "https://via.placeholder.com/1500x500",
      alt: "Trucks"
    },
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    logo: {
      url: "https://via.placeholder.com/500x500",
      alt: "Trucks"
    },
    isActive: true
  },
  {
    id: "4",
    name: "Electric",
    slug: "electric",
    banner: {
      url: "https://via.placeholder.com/1500x500",
      alt: "Electric"
    },
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    logo: {
      url: "https://via.placeholder.com/500x500",
      alt: "Electric"
    },
    isActive: true
  },
  {
    id: "5",
    name: "Sports",
    slug: "sports",
    banner: {
      url: "https://via.placeholder.com/1500x500",
      alt: "sports"
    },
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    logo: {
      url: "https://via.placeholder.com/500x500",
      alt: "sports"
    },
    isActive: true
  }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
