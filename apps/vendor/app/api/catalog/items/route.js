export async function GET(request) {

    const { searchParams } = new URL(request.url);

    const res = await fetch(`${process.env.CATALOG_API_URL}/items?${searchParams}`, {
        next: { revalidate: 0 },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${request.headers.get('Authorization')}`
        }
    });

    const data = await res.json();

    return Response.json(data)
}

export async function POST(request) {

    const {
        name,
        sku,
        quantity,
        price,
        description,
        categories,
        store_id,
        options,
    } = await request.json();

    const res = await fetch(
        `${process.env.CATALOG_API_URL}/items`,
        {
            method: 'POST',
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
                store_id,
                options
            })
        });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}