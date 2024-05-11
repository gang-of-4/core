export async function GET(request, { params }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);

  const res = await fetch(`${process.env.ORDERS_API_URL}/${id}?${searchParams}`, {
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

  return Response.json(data);
}
