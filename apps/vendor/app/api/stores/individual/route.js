export async function POST(request) {
    const { vendorId } = await request.json();

    const res = await fetch(
        `${process.env.STORES_API_URL}/individual`, {
        method: 'POST',
        next: { revalidate: 0 },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${request.headers.get('Authorization')}`
        },
        body: JSON.stringify({
            vendorId
        })
    });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}