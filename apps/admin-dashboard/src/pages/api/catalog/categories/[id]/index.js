export default async function handler(req, res) {
    if (req.method === 'GET') {

        const token = req.headers.authorization;
        const id = req.query.id;
        // @TODO: integrate with back
        // const respone = await fetch(
        //     `${process.env.CATALOG_API_URL}/categories`,
        //     {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `${token}`
        //         },
        //     }
        // );

        // const data = await respone.json();

        const data = {
            id: id,
            title: "Wheel Size",
            type: "radio",
            values: [{
                id: "1",
                label: "Small",
                value: "small"
            }, {
                id: "2",
                label: "Medium",
                value: "medium"
            }, {
                id: "3",
                label: "Large",
                value: "large"
            }]
        };

        // {
        //     id: id,
        //     title: "Color",
        //     type: "Color",
        //     values: [{
        //         id: "1",
        //         label: "Red",
        //         value: "#ff0000"
        //     }, {
        //         id: "2",
        //         label: "Blue",
        //         value: "#0000ff"
        //     }, {
        //         id: "3",
        //         label: "Black",
        //         value: "#000000"
        //     }]
        // };

        // if (!respone.ok) {
        //     return res.status(data.statusCode).json({ message: data.message });
        // }
        return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
        const token = req.headers.authorization;
        const id = req.query.id;

        // const respone = await fetch(
        //     `${process.env.CATALOG_API_URL}/categories/${id}`,
        //     {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `${token}`
        //         },
        //     }
        // );

        // const data = await respone.json();

        const data = id;

        // if (!respone.ok) {
        //     return res.status(data.statusCode).json({ message: data.message });
        // }

        return res.status(200).json(data);
    }

    if (req.method === 'PATCH') {

        const token = req.headers.authorization;
        const id = req.query.id;
        const body = req.body;
        // @TODO: integrate with back
        // const respone = await fetch(
        //     `${process.env.CATALOG_API_URL}/categories/${id}`,
        //     {
        //         method: 'PATCH',
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