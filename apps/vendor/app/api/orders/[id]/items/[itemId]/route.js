export async function PATCH(request, { params }) {
  const { id, itemId } = params;
  const { status } = await request.json();
  const { searchParams } = new URL(request.url);

  const res = await fetch(
    `${process.env.ORDERS_API_URL}/${id}/items/${itemId}/status?${searchParams}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${request.headers.get("Authorization")}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return new Response(JSON.stringify({ message: data.message }), {
      status: data.statusCode,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
