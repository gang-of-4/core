import Homepage from "@/components/catalog/homepage/Homepage";
import { config } from "ui/config";

export const metadata = {
  title: `${config.platformName}`,
  description: `${config.platformDescription}`,
};

async function getCategories() {
  const res = await fetch(`${process.env.CATALOG_API_URL}/categories`, {
    next: { revalidate: 0 },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return data;
}

async function getItems() {
  const res = await fetch(`${process.env.CATALOG_API_URL}/items`, {
    next: { revalidate: 0 },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const items = data.slice(0, 6);

  return items;
}

export default async function Home() {
  const categories = await getCategories();
  const featuredItems = await getItems();

  return (
    <>
      <Homepage categories={categories} featuredItems={featuredItems} />
    </>
  );
}
