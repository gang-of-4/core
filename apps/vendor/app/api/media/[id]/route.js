export async function GET(request, { params }) {
    const { id } = params;

    const res = await fetch(
        `${process.env.MEDIA_API_URL}/${id}`, {
        method: 'GET',
    });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}