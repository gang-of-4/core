export async function POST(request) {
  const res = await fetch(`${process.env.CART_API_URL}`, {
    method: "POST",
    next: { revalidate: 0 },
    headers: {
      Authorization: `${request.headers.get("Authorization")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return new Response(JSON.stringify({ message: data.message }), {
      status: data.statusCode,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}