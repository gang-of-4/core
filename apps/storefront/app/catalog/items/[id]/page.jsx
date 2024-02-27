import ItemPage from '@/components/catalog/items/ItemPage'
import React from 'react'
import { organization } from 'ui/config'

// @TODO: integrate with the catalog API
// export async function generateMetadata({ params }) {
//   // read route params
//   const id = params.id;

//   // fetch data
//   const item = await fetch(`${process.env.CATALOG_API_URL}/items/${id}`, {
//     next: { revalidate: 60 },
//   }).then((res) => res.json());

//   return {
//     title: `${organization.name} | ${item?.name}`,
//   };
// }

// async function getItem(id) {
//   const item = await fetch(`${process.env.CATALOG_API_URL}/items/${id}`, {
//     next: { revalidate: 0 },
//   }).then((res) => {
//     if (!res.ok) throw new Error("Failed to fetch");
//     return res.json();
//   });

//   return item;
// }

function getItem(id) {
    return {
        id: id,
        name: "Hyundai Accent",
        quantity: 10,
        images: [
            {
                url: "https://via.placeholder.com/500x500",
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
        price: 75000.00,
        currency: "SAR",
        description: "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        category: [{ id: "1" }],
        storeId: "1",
        status: "Approved",
        attributes: [],
        options: [
            {
                id: "1",
                title: "Color",
                values: [{
                    id: "1",
                    label: "Red",
                    value: "red"
                }, {
                    id: "2",
                    label: "Blue",
                    value: "blue"
                }, {
                    id: "3",
                    label: "Black",
                    value: "black"
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
                id: "1",
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
                        value: {
                            id: "1",
                            label: "Red",
                            value: "red"
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
                id: "2",
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
                        value: {
                            id: "2",
                            label: "Blue",
                            value: "blue"
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
                id: "3",
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
                        value: {
                            id: "2",
                            label: "Blue",
                            value: "blue"
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
                id: "4",
                quantity:1,
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
                        value: {
                            id: "2",
                            label: "Black",
                            value: "black"
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
    }
}


export default function page({ params }) {

    const item = getItem(params.id);

    return (
        <>
            <ItemPage item={item} />
        </>
    )
}
