"use client"

export default async function fetchApi({
    url,
    options = {},
    includeToken = true,
    revalidate = 0,
}) {

    let data = null;
    let error = null;
    let loading = false;

    let headers = options.headers || {};

    if (
        includeToken &&
        typeof window !== 'undefined' &&
        window?.localStorage
    ) {
        const token = localStorage.getItem('adminAccessToken');

        headers = {
            ...headers,
            Authorization: `Bearer ${token}`,
        };
    }

    const res = await fetch(
        url,
        {
            ...options,
            next: { revalidate: revalidate },
            headers,
        }
    );

    data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return { data, error, loading };

}