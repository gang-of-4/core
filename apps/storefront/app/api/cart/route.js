const dummyData = [
    {
        id: "1",
        item: {
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
        quantity: 1
    },
    {
        id: "2",
        item: {
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
        quantity: 2
    }
]


export async function GET(request) {

    // @TODO integrate with the cart API
    const res = await fetch(`${process.env.CART_API_URL}`, {
        next: { revalidate: 0 },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${request.headers.get('Authorization')}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    // const data = [...dummyData]
       

    return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
    const { cartItems } = await request.json();

    // @TODO integrate with the cart API
    const res = await fetch(`${process.env.CART_API_URL}`, {
        method: 'POST',
        next: { revalidate: 0 },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${request.headers.get('Authorization')}`
        },
        body: JSON.stringify({ cartItems })
    });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    // console.log('POST cartItems', cartItems);
    // console.log('POST cart token', request.headers.get('Authorization'));

    // const data = [
    //     ...dummyData,
    //     cartItems.map((item) => {
    //         return {
    //             id: dummyData.length + 1,
    //             item: item.item,
    //             quantity: item.quantity
    //         }
    //     })
    // ]

    return new Response(JSON.stringify(data), { status: 200 });
}

export async function PATCH(request) {
    const { cartItems } = await request.json();
    const id = cartItems.id;

    // @TODO integrate with the cart API
    const res = await fetch(`${process.env.CART_API_URL}/${id}`, {
        method: 'PATCH',
        next: { revalidate: 0 },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${request.headers.get('Authorization')}`
        },
        body: JSON.stringify({ cartItems })
    });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    // console.log('PATCH cartItems', cartItems);
    // console.log('PATCH cart token', request.headers.get('Authorization'));  

    // const data = [
    //     ...cartItems
    // ]

    return new Response(JSON.stringify(data), { status: 200 });
}

export async function DELETE(request) {
    const { id } = await request.json();

    // @TODO integrate with the cart API
    const res = await fetch(`${process.env.CART_API_URL}/${id}`, {
        method: 'DELETE',
        next: { revalidate: 0 },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${request.headers.get('Authorization')}`
        },
    });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    // console.log('DELETE cart token', request.headers.get('Authorization'));

    // const data = []

    return new Response(JSON.stringify(data), { status: 200 });
}

export async function Checkout(request) {
    const { cartItems } = await request.cartItems.json();
    const id = request.params.id;
    const address = request.address.json();

    // @TODO integrate with the cart API
    const res = await fetch(`${process.env.CART_API_URL}/${id}/checkout`, {
        method: 'POST',
        next: { revalidate: 0 },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${request.headers.get('Authorization')}`
        },
        body: JSON.stringify({ cartItems, address })
    });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    // console.log('POST cartItems', cartItems);
    // console.log('POST cart token', request.headers.get('Authorization'));

    // const data = [
    //     ...dummyData,
    //     cartItems.map((item) => {
    //         return {
    //             id: dummyData.length + 1,
    //             item: item.item,
    //             quantity: item.quantity
    //         }
    //     })
    // ]

    return new Response(JSON.stringify(data), { status: 200 });
}