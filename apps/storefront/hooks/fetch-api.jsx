"use client"

export default async function fetchApi({
    url,
    options = {},
    includeToken = true,
    revalidate = 0,
}) {

    let data = null;
    let error = null;
    let loading = true;
    try {

        let headers = options.headers || {};

        if (
            includeToken &&
            typeof window !== 'undefined' &&
            window?.localStorage
        ) {
            const token = localStorage.getItem('customerAccessToken');

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

    } catch (err) {
        error = err;
    } finally {
        loading = false;
    }

    return { data, error, loading };

}