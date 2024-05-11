import { formatOrder } from "@/utils/format-order";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const res = await fetch(`${process.env.ORDERS_API_URL}?${searchParams}`, {
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

  const formattedData = await Promise.all(
    data.map(async (order) => {
      return await formatOrder({
        order,
        includeUser: false,
        includeStore: true,
        token: `${request.headers.get("Authorization")}`,
      });
    })
  );

  return Response.json(formattedData);
}
