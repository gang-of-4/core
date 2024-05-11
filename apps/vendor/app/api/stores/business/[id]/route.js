export async function PATCH(request, { params }) {

    const {
        id
    } = params;

    const {
        name,
        logo,
        vatNumber,
        crNumber,
        ownerNationalId,
    } = await request.json();

    const res = await fetch(
        `${process.env.STORES_API_URL}/business/${id}`, {
        method: 'PATCH',
        next: { revalidate: 0 },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${request.headers.get('Authorization')}`
        },
        body: JSON.stringify({
            name,
            logo,
            vatNumber,
            crNumber,
            ownerNationalId
        })
    });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    return new Response(JSON.stringify(data), { status: 200 });

}