export async function GET(request) {

    const { searchParams } = new URL(request.url);

    const res = await fetch(`${process.env.CATALOG_API_URL}/items?${searchParams}`, {
        next: { revalidate: 0 },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }
    
    return Response.json(data);
}