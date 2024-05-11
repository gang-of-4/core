export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const token = req.headers.authorization;
    const { id } = req.query;
    const store = req.body;

    const respone = await fetch(
      `${process.env.STORES_API_URL}/business/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(store),
      }
    );

    const data = await respone.json();
    if (!respone.ok) {
      return res.status(data.statusCode).json({ message: data.message });
    }
    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
