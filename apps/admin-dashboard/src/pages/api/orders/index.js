export default async function handler(req, res) {

  const data = [{
    id: "e184cffd-01a6-468f-93c9-d2fe52d8613d",
    userId: "e184cffd-01a6-468f-93c9-d2fe52d8613d",
    orderItems: [
      {
        id: "e184cffd-01a6-468f-93c9-d2fe52d8613d",
        name: "Calista Nicholson",
        sku: "Et commodo adipisici",
        quantity: 5,
        price: 20,
        storeId: "ad60b6f5-a2f4-4fae-94c5-115b7171eb75",
        status: "INPROGRESS",
      groups: [
      {
        id: "e184cffd-01a6-468f-93c9-d2fe52d8613d",
        type: "TEXT",
        title: "Et commodo adipisici",
        values: [
          {
            id: "e184cffd-01a6-468f-93c9-d2fe52d8613d",
            label: "Et commodo adipisici",
            value: "Et commodo adipisici",
          },
          {
            id: "e184cffd-01a6-468f-93c9-d2fe52d8613d",
            label: "Et commodo adipisici",
            value: "Et commodo adipisici",
          }
        ]
      }
      ],
        images: [
          {
            id: "1d85d5e2-467c-4233-9931-e198b515eb3d",
            name: "05398927-7bad-4269-9f53-ffda4ea61010.jpg",
            url: "https://media.cars4sale.tech/659073e8-8e22-45e7-81d3-3378b660bf8a/05398927-7bad-4269-9f53-ffda4ea61010.jpg",
            size: 7270,
            extension: "jpg",
            createdAt: "2024-04-23T14:08:02.757Z",
            updatedAt: "2024-04-23T14:08:02.757Z",
          },
        ],
      isVariant: false,
      },
    ],
    total: 100,
    subtota: 100,
    status: "INPROGRESS",
    orderAddress: {
      id: "e184cffd-01a6-468f-93c9-d2fe52d8613d",
      country: "Et commodo adipisici",
      city: "Et commodo adipisici",
      street: "Et commodo adipisici",
      postalCode: "123",
      notes: "Et commodo adipisici",
    },
  },];

    if (req.method === "GET") {
      const token = req.headers.authorization;
  
      // const respone = await fetch(`${process.env.ORDERS_API_URL}`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `${token}`,
      //   },
      // });
  
      // const data = await respone.json();
  
      // if (!respone.ok) {
      //   return res.status(data.statusCode).json({ message: data.message });
      // }
      // return res.status(200).json(data);

      return res.status(200).json(data);
    }
  
    return res.status(405).json({ message: "Method not allowed" });
  }