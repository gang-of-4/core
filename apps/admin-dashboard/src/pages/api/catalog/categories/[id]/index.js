export default async function handler(req, res) {
  if (req.method === "GET") {
    const token = req.headers.authorization;
    const id = req.query.id;

    const response = await fetch(
      `${process.env.CATALOG_API_URL}/categories/${id}`,
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
    return res.status(200).json(data);
  }

  if (req.method === "DELETE") {
    const token = req.headers.authorization;
    const id = req.query.id;
    console.log("id", id);

    const response = await fetch(
      `${process.env.CATALOG_API_URL}/categories/${id}`,
      {
        method: "DELETE",
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

    return res.status(200).json(data);
  }

  if (req.method === "PATCH") {
    const token = req.headers.authorization;
    const id = req.query.id;
    const body = req.body;

    const response = await fetch(
      `${process.env.CATALOG_API_URL}/categories/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(data.statusCode).json({ message: data.message });
    }
    return res.status(200).json(data);
  }
  return res.status(405).json({ message: "Method not allowed" });
}
