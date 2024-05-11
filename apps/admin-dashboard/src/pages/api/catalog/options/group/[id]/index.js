export default async function handler(req, res) {
  if (req.method === "GET") {
    const token = req.headers.authorization;
    const requestedId = req.query.id;

    try {
      const response = await fetch(
        `${process.env.CATALOG_API_URL}/option-groups`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return res.status(data.statusCode).json({ message: data.message });
      }

      // Find the option group with the requested ID
      const requestedOptionGroup = data.find(
        (optionGroup) => optionGroup.id === requestedId
      );

      if (!requestedOptionGroup) {
        return res.status(404).json({ message: "Option group not found" });
      }

      return res.status(200).json(requestedOptionGroup);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // if (req.method === 'DELETE') {
  //     const token = req.headers.authorization;
  //     const id = req.query.id;

  //     const respone = await fetch(
  //         `${process.env.CATALOG_API_URL}/option-groups/${id}`,
  //         {
  //             method: 'DELETE',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 Authorization: `${token}`
  //             },
  //         }
  //     );

  //     const data = await respone.json();

  //     if (!respone.ok) {
  //         return res.status(data.statusCode).json({ message: data.message });
  //     }

  //     return res.status(200).json(data);
  // }

  // if (req.method === 'PATCH') {

  //     const token = req.headers.authorization;
  //     const id = req.query.id;
  //     const body = req.body;
  //     // @TODO: integrate with back
  //     const respone = await fetch(
  //         `${process.env.CATALOG_API_URL}/options/${id}`,
  //         {
  //             method: 'PATCH',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 Authorization: `${token}`
  //             },
  //             body: JSON.stringify(body)
  //         }
  //     );

  //     const data = await respone.json();

  //     // const data = body;

  //     if (!respone.ok) {
  //         return res.status(data.statusCode).json({ message: data.message });
  //     }
  //     return res.status(200).json(data);
  // }

  return res.status(405).json({ message: "Method not allowed" });
}
