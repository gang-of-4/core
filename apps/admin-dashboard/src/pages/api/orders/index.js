export default async function handler(req, res) {
  if (req.method === "GET") {
    const token = req.headers.authorization;

    const respone = await fetch(`${process.env.ORDERS_API_URL}`, {
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

    await Promise.all(
      data.map(async (order) => {
        if (order.userId !== null) {
          const authRespone = await fetch(
            `${process.env.USERS_API_URL}/${order.userId}`,
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
            return;
          }

          order.user = authData;
        }
      })
    );

    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
