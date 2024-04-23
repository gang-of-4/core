export default async function handler(req, res) {
    if (req.method === 'GET') {

        const token = req.headers.authorization;
        const query = req.query;
        const response = await fetch(
            `${process.env.CATALOG_API_URL}/items?${query}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ message: data.message });
        }

        return res.status(200).json(data);

    }

    return res.status(405).json({ message: 'Method not allowed' });
}