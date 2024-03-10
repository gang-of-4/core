export async function GET(request, { params }) {

    const {
        id
    } = params;

    const res = await fetch(
        `${process.env.CATALOG_API_URL}/items/${id}`, {
        method: 'GET',
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

    return new Response(JSON.stringify(data), { status: 200 });

};

export async function PATCH(request, { params }) {

    const {
        id
    } = params;

    const {
        name,
        sku,
        quantity,
        price,
        description,
        categories,
        options,
        variants,
        store_id,
    } = await request.json();

    const res = await fetch(
        `${process.env.CATALOG_API_URL}/items/${id}`,
        {
            method: 'PATCH',
            next: { revalidate: 0 },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${request.headers.get('Authorization')}`
            },
            body: JSON.stringify({
                name,
                sku,
                quantity,
                price,
                description,
                categories,
                options,
                variants,
                store_id,
            })
        });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    return new Response(JSON.stringify(data), { status: 200 });

};

export async function DELETE(request, { params }) {

    const {
        id
    } = params;

    const res = await fetch(
        `${process.env.CATALOG_API_URL}/items/${id}`, {
        method: 'DELETE',
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

    return new Response(JSON.stringify(data), { status: 200 });

};