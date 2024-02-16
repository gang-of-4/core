import Category from '@/components/catalog/Category'
import React from 'react'
import { organization } from 'ui/config'

// @TODO: integrate with the catalog API
// export async function generateMetadata({ params }) {
//   // read route params
//   const id = params.id;

//   // fetch data
//   const category = await fetch(`${process.env.CATALOG_API_URL}/categories/${id}`, {
//     next: { revalidate: 60 },
//   }).then((res) => res.json());

//   return {
//     title: `${organization.name} | ${category?.name}`,
//   };
// }

// async function getCategory(id) {
//   const category = await fetch(`${process.env.CATALOG_API_URL}/categories/${id}`, {
//     next: { revalidate: 0 },
//   }).then((res) => {
//     if (!res.ok) throw new Error("Failed to fetch");
//     return res.json();
//   });

//   return category;
// }

function getCategory(id) {
  return {
    id: id,
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
  }
}

export default function page({ params }) {

  const category = getCategory(params.id)

  return (
    <Category category={category} />
  )
}
