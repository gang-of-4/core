export async function GET(request, { params }) {

    const {
        id
    } = params;

    const res = await fetch(
        `${process.env.CATALOG_API_URL}/items/${id}`, {
        method: 'GET',
        next: { revalidate: 0 },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${request.headers.get('Authorization')}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    return new Response(JSON.stringify(data), { status: 200 });

};

export async function PATCH(request, { params }) {

    const {
        id
    } = params;

    const formData = await request.formData();
    const name = formData.get('name');
    const sku = formData.get('sku');
    const quantity = formData.get('quantity');
    const price = formData.get('price');
    const description = formData.get('description');
    const categories = JSON.parse(formData.get('categories'));
    const options = JSON.parse(formData.get('options'));
    const variants = JSON.parse(formData.get('variants'));
    const storeId = formData.get('storeId');
    const images = formData.getAll('images');

    const mediaIds = [];

    images.forEach(async (image) => {

        const mediaFormData = new FormData();
        mediaFormData.append('image', image);

        const mediaRes = await fetch(
            `${process.env.MEDIA_API_URL}/upload/image`, {
            method: 'POST',
            next: { revalidate: 0 },
            headers: {
                'Authorization': `${request.headers.get('Authorization')}`
            },
            body: mediaFormData
        });

        const mediaData = await mediaRes.json();

        if (!mediaRes.ok) {
            return new Response(JSON.stringify({ message: mediaData.message }), { status: mediaData.statusCode });
        }

        console.log('mediaData', mediaData);

        mediaIds.push(mediaData.id);

    });

    const res = await fetch(
        `${process.env.CATALOG_API_URL}/items/${id}`,
        {
            method: 'PATCH',
            next: { revalidate: 0 },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${request.headers.get('Authorization')}`
            },
            body: JSON.stringify({
                name,
                sku,
                quantity: +quantity,
                price: +price,
                description,
                categories,
                options,
                variants,
                store_id: storeId,
                images: mediaIds
            })
        });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    return new Response(JSON.stringify(data), { status: 200 });

};

export async function DELETE(request, { params }) {

    const {
        id
    } = params;

    const res = await fetch(
        `${process.env.CATALOG_API_URL}/items/${id}`, {
        method: 'DELETE',
        next: { revalidate: 0 },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${request.headers.get('Authorization')}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        return new Response(JSON.stringify({ message: data.message }), { status: data.statusCode });
    }

    return new Response(JSON.stringify(data), { status: 200 });

};