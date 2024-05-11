import { formatOrder } from "@/utils/format-order";

export async function GET(request, { params }) {
  const { id } = params;

  const res = await fetch(`${process.env.ORDERS_API_URL}/${id}`, {
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

  const formattedOrder = await formatOrder({
    order: data,
    includeUser: false,
    includeStore: true,
    token: `${request.headers.get("Authorization")}`,
  });

  return Response.json(formattedOrder);
}

export async function DELETE(request, { params }) {
  const { id } = params;

  const res = await fetch(`${process.env.ORDERS_API_URL}/${id}`, {
    method: "DELETE",
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
