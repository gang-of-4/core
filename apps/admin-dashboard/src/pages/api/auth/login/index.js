export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  const respone = await fetch(`${process.env.AUTH_API_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await respone.json();

  if (!respone.ok) {
    return res.status(data.statusCode).json({ message: data.message });
  }

  const accessToken = data.access_token;
  return res.status(200).json({ accessToken });
}
