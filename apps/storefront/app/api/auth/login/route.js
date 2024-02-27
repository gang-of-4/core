export async function POST(request) {

    const {
        email,
        password,
    } = await request.json();

    try {
        const res = await fetch(
            `${process.env.AUTH_API_URL}/customer/login`,
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
            throw new Error(data.message);
        }

        const accessToken = data.access_token;

        return Response.json({ accessToken });

    } catch (err) {
        return Response.error(err.message);
    }

}