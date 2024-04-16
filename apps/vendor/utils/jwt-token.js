export async function decodeUser(token) {

    try {
        const {user} = await jwtDecode(token);

        if (!user) {
            throw new Error('Invalid authorization token');
        }

        return (user);

    } catch (err) {
        throw new Error(err.message);
    }
}

async function jwtDecode(token) {

    const [encodedHeader, encodedPayload] = token.split('.');

    const header = await JSON.parse(atob(encodedHeader));
    const payload = await JSON.parse(atob(encodedPayload));
    const now = new Date();

    if (header.expiresIn && now < header.expiresIn) {
        throw new Error('Expired token');
    }

    return payload;
};