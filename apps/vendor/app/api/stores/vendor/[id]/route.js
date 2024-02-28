export async function GET(request, { params }) {

    const res = await fetch(
        `${process.env.STORES_API_URL}/vendor/${params.id}`,
        {
            method: 'GET',
            next: { revalidate: 0 },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${request.headers.get('Authorization')}`
            }
        }
    );

    const data = await res.json();

    if(!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    return new Response(JSON.stringify(data), { status: 200 });

}