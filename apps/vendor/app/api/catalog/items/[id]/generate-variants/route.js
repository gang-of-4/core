export async function POST(request) {
    const { options, draftItemId } = await request.json();

    const res = await fetch(
        `${process.env.CATALOG_API_URL}/items/${draftItemId}/variants`,
        {
            method: 'POST',
            next: { revalidate: 0 },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${request.headers.get('Authorization')}`
            },
            body: JSON.stringify({ options })
        }
    );

    const data = await res.json();
    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }
    return new Response(JSON.stringify(data), { status: 200 });
}