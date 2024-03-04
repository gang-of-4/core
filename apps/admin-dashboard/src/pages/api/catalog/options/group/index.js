export default async function handler(req, res) {
    if (req.method === 'POST') {

        const token = req.headers.authorization;
        const body = req.body;
        // @TODO: integrate with back
        // const respone = await fetch(
        //     `${process.env.CATALOG_API_URL}/options`,
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `${token}`
        //         },
        //         body: JSON.stringify(body)
        //     }
        // );

        // const data = await respone.json();

        const data = body;
        
        // if (!respone.ok) {
        //     return res.status(data.statusCode).json({ message: data.message });
        // }
        return res.status(200).json(data);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}