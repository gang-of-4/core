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
        ...request,
        phone
    } : requestBody = {
        firstName,
        lastName,
        email,
        password,
        passwordConfirmation
    };

    try {
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
            throw new Error(data.message);
        }

        const user = data.user;

        return Response.json({ user });

    } catch (err) {
        return Response.error(err.message);
    }

}