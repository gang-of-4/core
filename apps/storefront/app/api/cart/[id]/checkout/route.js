export async function POST(request, { params }) {
  const { id } = params;
  const { paymentMethodId, address } = await request.json();

  const res = await fetch(`${process.env.CART_API_URL}/${id}/checkout`, {
    method: "POST",
    next: { revalidate: 0 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${request.headers.get("Authorization")}`,
    },
    body: JSON.stringify({ paymentMethodId, address }),
  });

  const data = await res.json();

  if (!res.ok) {
    return new Response(JSON.stringify({ message: data.message }), {
      status: data.statusCode,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
