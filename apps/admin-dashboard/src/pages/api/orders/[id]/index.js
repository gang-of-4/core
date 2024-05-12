export default async function handler(req, res) {
  if (req.method === "GET") {
    const token = req.headers.authorization;

    const { id } = req.query;

    const respone = await fetch(`${process.env.ORDERS_API_URL}/${id}`, {
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

    if (data.userId !== null) {
      const authRespone = await fetch(
        `${process.env.USERS_API_URL}/${data.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      const authData = await authRespone.json();

      if (!authRespone.ok) {
        console.error(authData);
        return res.status(200).json(data);
      }

      data.user = authData;
    }

    return res.status(200).json(data);
  }

  if (req.method === "PATCH") {
    const token = req.headers.authorization;
    const { id } = req.query;
    const body = req.body;

    const respone = await fetch(`${process.env.ORDERS_API_URL}/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await respone.json();

    if (!respone.ok) {
      return res.status(data.statusCode).json({ message: data.message });
    }
    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
