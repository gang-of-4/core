import fetchApi from "../../utils/fetch-api";


class MediaApi {

    async getMedia(id) {
        let media;
        try {
            const {data} = await fetchApi({
                url: `/admin/api/media/${id}`,
                options: {
                    method: 'GET',
                }
            });
            media = data;
        } catch (err) {
            console.error(err);
        }

        return Promise.resolve(media);
    }

}

export const mediaApi = new MediaApi();
