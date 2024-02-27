export async function POST(request) {

    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        passwordConfirmation,
    } = await request.json();

    let requestBody = {};

    phone ? requestBody = {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation,
        phone
    } : requestBody = {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation
    };

    const res = await fetch(
        `${process.env.AUTH_API_URL}/customer/register`,
        {
            method: 'POST',
            next: { revalidate: 0 },
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    const user = data.user;

    return new Response(JSON.stringify({ user }), { status: 200 });

}