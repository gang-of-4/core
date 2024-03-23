export async function GET(request) {

    const { searchParams } = new URL(request.url);

    const res = await fetch(`${process.env.CATALOG_API_URL}/items?${searchParams}`, {
        next: { revalidate: 0 },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    await Promise.all(data.map(async item => {
        if (item?.images?.[0]?.mediaId) {
            const mediaRes = await fetch(`${process.env.MEDIA_API_URL}/${item.images[0].mediaId}`, {
                next: { revalidate: 60 },
            });
            const mediaData = await mediaRes.json();
            item.images[0] = mediaData;
        }
    }));
    
    return Response.json(data);
}