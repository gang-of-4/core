export async function GET(request) {

    const { searchParams } = new URL(request.url);

    // @TODO integrate with the catalog API
    // const res = await fetch(`${process.env.CATALOG_API_URL}/items?${searchParams}`, {
    //     next: { revalidate: 0 }, 
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // });

    // const data = await res.json();

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
            status: "Approved",
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
            status: "Approved",
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
            status: "Approved",
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
            status: "Approved",
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
            status: "Approved",
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
            status: "Approved",
            attributes: [],
            options: [],
            order: 6,
            isActive: true,
            isTaxable: false
        }
    ];

    return Response.json(data)

}