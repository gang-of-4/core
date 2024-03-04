import fetchApi from '../../utils/fetch-api';

class CatalogApi {

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

}

export const catalogApi = new CatalogApi();
