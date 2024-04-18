export async function POST(request) {

    const res = await fetch(`${process.env.CART_API_URL}`, {
        method: 'POST',
        next: { revalidate: 0 },
        headers: {
            'Authorization': `${request.headers.get('Authorization')}`
        },
    });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

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