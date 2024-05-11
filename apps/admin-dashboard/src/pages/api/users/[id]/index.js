export default async function handler(req, res) {
  if (req.method === "GET") {
    const token = req.headers.authorization;
    const { id } = req.query;

    const respone = await fetch(`${process.env.USERS_API_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    const data = await respone.json();

    if (!respone.ok) {
      return res.status(data.statusCode).json({ message: data.message });
    }
    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
