export async function POST(request, { params }) {

  const { id } = params;
  const { itemId, quantity, isVariant } = await request.json();

  const res = await fetch(`${process.env.CART_API_URL}/${id}/items`, {
    method: "POST",
    next: { revalidate: 0 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${request.headers.get("Authorization")}`,
    },
    body: JSON.stringify({ itemId, quantity, isVariant }),
  });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    return new Response(JSON.stringify(data), { status: 200 });
}