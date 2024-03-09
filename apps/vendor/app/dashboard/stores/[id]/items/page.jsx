import Page from "@/components/dashboard/catalog/itemsList/ItemsPage";
import SelectStore from "@/components/dashboard/catalog/SelectStore";
import React from "react";

export const metadata = {
  title: "Cars | Vendor",
};

async function getItems(storeId) {

  // @TODO integrate with the catalog API
  // const res = await fetch(
  // `${process.env.CATALOG_API_URL}/items?store_id=${storeId}`
  //   {
  //     method: "GET",
  //     next: { revalidate: 0 },
  //   }
  // );

  // const data = await res.json();

  // if (!res.ok) {
  //   throw new Error("Failed to fetch");
  // }

  const data = [
    {
      id: "1",
      name: "Hyundai Accent",
      quantity: 10,
      images: [{
        url: "https://via.placeholder.com/500x500",
      }],
      price: 75000.00,
      currency: "SAR",
      description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      category: [{ id: "1" }],
      storeId: "1",
      status: "REJECTED",
      attributes: [],
      options: [],
      order: 1,
      isActive: true,
      isTaxable: false
    },
    {
      id: "2",
      name: "Hyundai Elantra",
      quantity: 10,
      images: [{
        url: "https://via.placeholder.com/500x500",
      }],
      price: 85000.00,
      currency: "SAR",
      description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      category: [{ id: "1" }],
      storeId: "1",
      status: "APPROVED",
      attributes: [],
      options: [],
      order: 2,
      isActive: true,
      isTaxable: false
    },
    {
      id: "3",
      name: "Hyundai Sonata",
      quantity: 10,
      images: [{
        url: "https://via.placeholder.com/500x500",
      }],
      price: 95000.00,
      currency: "SAR",
      description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      category: [{ id: "1" }],
      storeId: "1",
      status: "APPROVED",
      attributes: [],
      options: [],
      order: 3,
      isActive: true,
      isTaxable: false
    },
    {
      id: "4",
      name: "Hyundai Azera",
      quantity: 10,
      images: [{
        url: "https://via.placeholder.com/500x500",
      }],
      price: 105000.00,
      currency: "SAR",
      description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      category: [{ id: "1" }],
      storeId: "1",
      status: "APPROVED",
      attributes: [],
      options: [],
      order: 4,
      isActive: true,
      isTaxable: false
    },
    {
      id: "5",
      name: "Hyundai Genesis",
      quantity: 10,
      images: [{
        url: "https://via.placeholder.com/500x500",
      }],
      price: 125000.00,
      currency: "SAR",
      description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      category: [{ id: "1" }],
      storeId: "1",
      status: "APPROVED",
      attributes: [],
      options: [],
      order: 5,
      isActive: true,
      isTaxable: false
    },
    {
      id: "6",
      name: "Hyundai Equus",
      quantity: 10,
      images: [{
        url: "https://via.placeholder.com/500x500",
      }],
      price: 150000.00,
      currency: "SAR",
      description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      category: [{ id: "1" }],
      storeId: "1",
      status: "APPROVED",
      attributes: [],
      options: [],
      order: 6,
      isActive: true,
      isTaxable: false
    }
  ];

  return data;
}

export default async function page({ params }) {

  let items = [];

  if (params.id) {
    items = await getItems(params.id);
  }

  return (
    <>
      {items.length === 0 ?
        <SelectStore />
        :
        <Page
          items={items}
          storeId={params.id}
        />
      }
    </>
  );
}
