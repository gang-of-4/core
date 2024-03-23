export default async function handler(req, res) {
    if (req.method === 'POST') {

        const token = req.headers.authorization;
        const body = req.body;

        const response = await fetch(
            `${process.env.CATALOG_API_URL}/option-groups`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
                body: JSON.stringify({ title: body.title, type: body.type })
            }
        );

        const data = await response.json();

        const optionsData = [];
        for (const value of body.values) {
            const optionsResponse = await fetch(
                `${process.env.CATALOG_API_URL}/options`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`
                    },
                    body: JSON.stringify({ label: value.label, value: value.value, group_id: data.id })
                }
            );

            const optionData = await optionsResponse.json();
            optionsData.push(optionData);
        }

        if (!response.ok) {
            return res.status(data.statusCode).json({ message: data.message, optionsData });
        }
        return res.status(200).json(data);
    }

    if (req.method === 'GET') {

        const token = req.headers.authorization;
        const respone = await fetch(
            `${process.env.CATALOG_API_URL}/option-groups`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
            }
        );

        const data = await respone.json();

        if (!respone.ok) {
            return res.status(data.statusCode).json({ message: data.message });
        }
        return res.status(200).json(data);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}