import fetchApi from '../../utils/fetch-api';

class CatalogApi {

    // Items
    async getItems({
        q, status
    }) {
        let items;
        let url = '/admin/api/catalog/items';

        (q) && (url += `?q=${q}`);
        (q) && (status) && (url += `&status=${status}`);
        (!q) && (status) && (url += `?status=${status}`);

        try {
            const { data } = await fetchApi({
                url: url,
                options: {
                    method: 'GET',
                }
            });
            items = data;
        } catch (err) {
            console.error(err);
        }

        return Promise.resolve(items);
    }

    async editItem({
        id,
        name,
        sku,
        quantity,
        price,
        description,
        categories,
        options,
        variants,
        store_id
    }) {
        let data;
        try {
            const { data: returnedData } = await fetchApi({
                url: `/admin/api/catalog/items/${id}`,
                options: {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        sku,
                        quantity,
                        price,
                        description,
                        categories,
                        options,
                        variants,
                        store_id
                    })
                }
            });
            data = returnedData;
        } catch (err) {
            console.error(err);
        }

        return Promise.resolve(data);
    }

    async editSatatus({
        id,
        status
    }) {
        let data;
        try {
            const { data: returnedData } = await fetchApi({
                url: `/admin/api/catalog/items/${id}/status`,
                options: {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        status
                    })
                }
            });
            data = returnedData;
        } catch (err) {
            console.error(err);
        }

        return Promise.resolve(data);
    }

    // Options
    async getOptions() {

        let options;
        try {
            const { data } = await fetchApi({
                url: '/admin/api/catalog/options',
                options: {
                    method: 'GET',
                }
            });
            options = data;
        } catch (err) {
            console.error(err);
        }

        let count = options.length;

        return Promise.resolve({
            options,
            count
        });
    }

    async getOptionGroup(id) {

        let option;
        try {
            const { data } = await fetchApi({
                url: `/admin/api/catalog/options/group/${id}`,
                options: {
                    method: 'GET',
                }
            });
            option = data;
        } catch (err) {
            console.error(err);
        }

        return Promise.resolve(option);
    }

    async createOptionGroup({
        title,
        type,
        options
    }) {
        let data;
        try {
            const { data: returnedData } = await fetchApi({
                url: `/admin/api/catalog/options/group`,
                options: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title,
                        type,
                        values: options
                    })
                }
            });
            data = returnedData;
        } catch (err) {
            console.error(err);
        }

        return Promise.resolve(data);
    }

    async deleteOptionGroup(id) {
        let options;
        try {
            const { data } = await fetchApi({
                url: `/admin/api/catalog/options/group/${id}`,
                options: {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            });
            options = data;
        } catch (err) {
            console.error(err);
        }

        return Promise.resolve(options);
    }

    async editOptionGroup({
        id,
        title,
        type,
        options
    }) {
        let data;
        try {
            const { data: returnedData } = await fetchApi({
                url: `/admin/api/catalog/options/group/${id}`,
                options: {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title,
                        type,
                        values: options
                    })
                }
            });
            data = returnedData;
        } catch (err) {
            console.error(err);
        }

        return Promise.resolve(data);
    }

    // Categories
    async getCategories() {

        let categories;
        try {
            const { data } = await fetchApi({
                url: '/admin/api/catalog/categories',
                options: {
                    method: 'GET',
                }
            });
            categories = data;
        } catch (err) {
            console.error(err);
        }

        let count = categories.length;

        return Promise.resolve({
            categories,
            count
        });
    }

    async getCategory(id) {

        let category;
        try {
            const { data } = await fetchApi({
                url: `/admin/api/catalog/categories/${id}`,
                options: {
                    method: 'GET',
                }
            });
            category = data;
        } catch (err) {
            console.error(err);
        }

        return Promise.resolve(category);
    }

    async createCategory({
        name,
        description,
        banner,
        logo
    }) {
        let data;
        try {
            const { data: returnedData } = await fetchApi({
                url: `/admin/api/catalog/categories`,
                options: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        description,
                        banner,
                        logo
                    })
                }
            });
            data = returnedData;
        } catch (err) {
            console.error(err);
        }

        return Promise.resolve(data);
    }

    async deleteCategory(id) {
        let categories;
        try {
            const { data } = await fetchApi({
                url: `/admin/api/catalog/category/${id}`,
                options: {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            });
            categories = data;
        } catch (err) {
            console.error(err);
        }

        return Promise.resolve(categories);
    }

    async editCategory({
        id,
        name,
        description,
        banner,
        logo
    }) {
        let data;
        try {
            const { data: returnedData } = await fetchApi({
                url: `/admin/api/catalog/category/${id}`,
                options: {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        description,
                        banner,
                        logo
                    })
                }
            });
            data = returnedData;
        } catch (err) {
            console.error(err);
        }

        return Promise.resolve(data);
    }
}

export const catalogApi = new CatalogApi();
