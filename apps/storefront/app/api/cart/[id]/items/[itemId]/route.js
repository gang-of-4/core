export async function PATCH(request, { params }) {
  const { id, itemId } = params;
  const { quantity } = await request.json();

  const res = await fetch(`${process.env.CART_API_URL}/${id}/items/${itemId}`, {
    method: "PATCH",
    next: { revalidate: 0 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${request.headers.get("Authorization")}`,
    },
    body: JSON.stringify({ quantity }),
  });

  const data = await res.json();

  if (!res.ok) {
    return new Response(JSON.stringify({ message: data.message }), {
      status: data.statusCode,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function DELETE(request, { params }) {
  const { id, itemId } = params;

  const res = await fetch(`${process.env.CART_API_URL}/${id}/items/${itemId}`, {
    method: "DELETE",
    next: { revalidate: 0 },
    headers: {
      "Content-Type": "application/json",
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
