export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        const token = req.headers.authorization;
        const id = req.query.id;

        // @TODO-IMP change api endpoint to update status
        const response = await fetch(
            `${process.env.CATALOG_API_URL}/items/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
                body: JSON.stringify(req.body)
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