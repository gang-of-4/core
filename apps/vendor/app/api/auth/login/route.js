export async function POST(request) {

    const {
        email,
        password,
    } = await request.json();

    const res = await fetch(
        `${process.env.AUTH_API_URL}/vendor/login`,
        {
            method: 'POST',
            next: { revalidate: 0 },
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    const accessToken = data.access_token;
    return new Response(JSON.stringify({ accessToken }), { status: 200 });

}