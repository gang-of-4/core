import Category from "@/components/catalog/Category";
import React from "react";
import { config } from "ui/config";

async function getCategory(id) {
  const res = await fetch(`${process.env.CATALOG_API_URL}/categories/${id}`, {
    next: { revalidate: 0 },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return data;
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

export async function generateMetadata({ params }) {
  // read route params
  const id = params.id;

  // fetch data
  const category = await getCategory(id);

  return {
    title: `${config.platformName} | ${category?.name}`,
  };
}

export default async function page({ params }) {
  const category = await getCategory(params.id);
  const categoryMedia = await getCategoryMedia(category);
  return (
    <Category
      category={{
        ...category,
        ...categoryMedia,
      }}
    />
  );
}
