export async function GET(request) {
  const { searchParams } = new URL(request.url);

  console.log(searchParams);

  const res = await fetch(`${process.env.ORDERS_API_URL}?${searchParams}`, {
    next: { revalidate: 0 },
    headers: {
      Authorization: `${request.headers.get("Authorization")}`,
    },
  });

  const data = await res.json();

  console.log("DATA", data);
  if (!res.ok) {
    return new Response(JSON.stringify({ message: data.message }), {
      status: data.statusCode,
    });
  }

  return Response.json(data);
}
