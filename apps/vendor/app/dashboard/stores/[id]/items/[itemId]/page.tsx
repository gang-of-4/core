import React from 'react'
import { Metadata } from 'next';
import ViewItem from '@/components/dashboard/catalog/itemPage/ViewItem';



export const metadata: Metadata = {
  title: 'View Car | Vendor',
  description: 'View car'
};

async function getItem(id: string) {

  // @TODO integrate with the catalog API
  // const res = await fetch(
  // `${process.env.CATALOG_API_URL}/items/${id}`
  //   {
  //     method: "GET",
  //     next: { revalidate: 0 },
  //   }
  // );

  // const data = await res.json();

  // if (!res.ok) {
  //   throw new Error("Failed to fetch");
  // }

  const data =
  {
    id: id,
    name: "Hyundai Accent",
    quantity: 10,
    images: [{
      url: "https://via.placeholder.com/500x500",
    }],
    price: 75000.00,
    currency: "SAR",
    description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    storeId: "1",
    status: "APPROVED",
    categories: [
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
        name: "Hyundai",
        slug: "hyundai",
        banner: {
          url: "https://via.placeholder.com/1500x500",
          alt: "Hyundai"
        },
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        logo: {
          url: "https://via.placeholder.com/500x500",
          alt: "Hyundai"
        },
        isActive: true
      }
    ],

    attributes: [
      {
        id: "1",
        attribute: {
          id: "1",
          title: "Year",
        },
        value: "2021"
      },
      {
        id: "2",
        attribute: {
          id: "2",
          title: "Engine",
        },
        value: "1.6L"
      }
    ],
    options: [
      {
        id: "1",
        title: "Color",
        type: "color",
        values: [{
          id: "1",
          label: "Red",
          value: "#801204"
        }, {
          id: "2",
          label: "Blue",
          value: "#0b3d87"
        }, {
          id: "3",
          label: "Black",
          value: "#1a1a1a"
        }]
      },
      {
        id: "2",
        title: "Wheel Size",
        values: [{
          id: "1",
          label: "Small",
          value: "small"
        }, {
          id: "2",
          label: "Medium",
          value: "medium"
        }, {
          id: "3",
          label: "Large",
          value: "large"
        }]
      },
    ],
    variants: [
      {
        id: `${id}.v1`,
        quantity: 5,
        images: [
          {
            url: "https://via.placeholder.com/500x500",
          },
          {
            url: "https://via.placeholder.com/600x600",
          },
          {
            url: "https://via.placeholder.com/600x600",
          },
          {
            url: "https://via.placeholder.com/600x600",
          },
          {
            url: "https://via.placeholder.com/600x600",
          },
          {
            url: "https://via.placeholder.com/750x750",
          },
          {
            url: "https://via.placeholder.com/100x100",
          }
        ],
        price: 77000.00,
        currency: "SAR",
        options: [
          {
            id: "1",
            title: "Color",
            type: "color",
            value: {
              id: "1",
              label: "Red",
              value: "#801204"
            }
          },
          {
            id: "2",
            title: "Wheel Size",
            value: {
              id: "1",
              label: "Small",
              value: "small"
            }
          }
        ],
      },
      {
        id: `${id}.v2`,
        quantity: 2,
        images: [
          {
            url: "https://via.placeholder.com/500x500",
          },
        ],
        price: 75000.50,
        currency: "SAR",
        options: [
          {
            id: "1",
            title: "Color",
            type: "color",
            value: {
              id: "2",
              label: "Blue",
              value: "#0b3d87"
            }
          },
          {
            id: "2",
            title: "Wheel Size",
            value: {
              id: "2",
              label: "Small",
              value: "small"
            }
          }
        ],
      },
      {
        id: `${id}.v3`,
        quantity: 2,
        images: [
          {
            url: "https://via.placeholder.com/500x500",
          },
        ],
        price: 75499.99,
        currency: "SAR",
        options: [
          {
            id: "1",
            title: "Color",
            type: "color",
            value: {
              id: "2",
              label: "Blue",
              value: "#0b3d87"
            }
          },
          {
            id: "2",
            title: "Wheel Size",
            value: {
              id: "2",
              label: "Medium",
              value: "medium"
            }
          }
        ],
      },
      {
        id: `${id}.v4`,
        quantity: 1,
        images: [
          {
            url: "https://via.placeholder.com/500x500",
          },
          {
            url: "https://via.placeholder.com/500x500",
          },
        ],
        price: 75500.00,
        currency: "SAR",
        options: [
          {
            id: "1",
            title: "Color",
            type: "color",
            value: {
              id: "2",
              label: "Black",
              value: "#1a1a1a"
            }
          },
          {
            id: "2",
            title: "Wheel Size",
            value: {
              id: "2",
              label: "Medium",
              value: "medium"
            }
          }
        ],
      }
    ],
    order: 1,
    isActive: true,
    isTaxable: false
  };

  return data;
}

export default async function page({ params }: { params: { id: string, itemId: string } }) {

  const item = await getItem(params.itemId);

  return (
    <>
      <ViewItem
        item={item}
        storeId={params.id}
      />
    </>

  )
}
