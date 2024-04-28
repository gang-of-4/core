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

  const categories = await Promise.all(
    data.map(async (category) => {
      const media = await getCategoryMedia(category);
      return { ...category, ...media };
    })
  );

  return categories;
}

async function getCategoryMedia(category) {
  const media = {};
  if (category.banner) {
    try {
      const res = await fetch(
        `${process.env.MEDIA_API_URL}/${category.banner}`,
        {
          next: { revalidate: 0 },
        }
      );
      const data = await res.json();
      media.banner = data;
    } catch (error) {
      console.log(error);
    }
  }

  if (category.logo) {
    try {
      const res = await fetch(`${process.env.MEDIA_API_URL}/${category.logo}`, {
        next: { revalidate: 0 },
      });
      const data = await res.json();
      media.logo = data;
    } catch (error) {
      console.log(error);
    }
  }

  return media;
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
