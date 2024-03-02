export default async function handler(req, res) {
    if (req.method === 'GET') {

        const token = req.headers.authorization;
        // @TODO: integrate with back
        // const respone = await fetch(
        //     `${process.env.CATALOG_API_URL}/options`,
        //     {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `${token}`
        //         },
        //     }
        // );

        // const data = await respone.json();

        const data = [
            {
                id: "1",
                title: "Color",
                type: "color",
                values: [{
                    id: "1",
                    label: "Red",
                    value: "#ff0000"
                }, {
                    id: "2",
                    label: "Blue",
                    value: "#0000ff"
                }, {
                    id: "3",
                    label: "Black",
                    value: "#000000"
                }]
            },
            {
                id: "2",
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
            },
            {
                id: "3",
                title: "Engine",
                type: "radio",
                values: [{
                    id: "1",
                    label: "4 Cylinder",
                    value: "4cylinder"
                }, {
                    id: "2",
                    label: "6 Cylinder",
                    value: "6cylinder"
                }, {
                    id: "3",
                    label: "8 Cylinder",
                    value: "8cylinder"
                }]
            }
        ];

        // if (!respone.ok) {
        //     return res.status(data.statusCode).json({ message: data.message });
        // }
        return res.status(200).json(data);
    }

    return res.status(405).json({ message: 'Method not allowed' });
}