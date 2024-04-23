export async function POST(request) {
  const formData = await request.formData();
  const vendorId = formData.get("vendorId");
  const name = formData.get("name");
  const logo = formData.get("logo");
  const vatNumber = formData.get("vatNumber");
  const crNumber = formData.get("crNumber");
  const ownerNationalId = formData.get("ownerNationalId");

  let mediaId = null;

  if (logo) {
    const mediaFormData = new FormData();
    mediaFormData.append("image", logo);

    const mediaRes = await fetch(`${process.env.MEDIA_API_URL}/upload/image`, {
      method: "POST",
      next: { revalidate: 0 },
      headers: {
        Authorization: `${request.headers.get("Authorization")}`,
      },
      body: mediaFormData,
    });

    const mediaData = await mediaRes.json();

    if (!mediaRes.ok) {
      return new Response(JSON.stringify({ message: mediaData.message }), {
        status: mediaData.statusCode,
      });
    }

    mediaId = mediaData.id;
  }

  const storesRes = await fetch(`${process.env.STORES_API_URL}/business`, {
    method: "POST",
    next: { revalidate: 0 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${request.headers.get("Authorization")}`,
    },
    body: JSON.stringify({
      vendorId,
      name,
      logo: mediaId,
      vatNumber,
      crNumber,
      ownerNationalId,
    }),
  });

  const storesData = await storesRes.json();

  if (!storesRes.ok) {
    return new Response(JSON.stringify({ message: storesData.message }), {
      status: storesData.statusCode,
    });
  }

  return new Response(JSON.stringify(storesData), { status: 200 });
}
