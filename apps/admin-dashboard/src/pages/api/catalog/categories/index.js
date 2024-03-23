export default async function handler(req, res) {
    if (req.method === 'GET') {

        const token = req.headers.authorization;
        
        const response = await fetch(
            `${process.env.CATALOG_API_URL}/categories`,
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
            return res.status(data.statusCode).json({ message: data.message });
        }
        return res.status(200).json(data);
    }

    if (req.method === 'POST') {

        const token = req.headers.authorization;
        const body = req.body;
        
        const response = await fetch(
            `${process.env.CATALOG_API_URL}/categories`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
                body: JSON.stringify(body)
            }
        );
        
        const data = await response.json();

        if (!response.ok) {
            return res.status(data.statusCode).json({ message: data.message });
        }
        return res.status(200).json(data);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}