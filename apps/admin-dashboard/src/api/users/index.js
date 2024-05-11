import fetchApi from "../../utils/fetch-api";

class UsersApi {
  async getUser(id) {
    let user;
    try {
      const { data } = await fetchApi({
        url: `/admin/api/users/${id}`,
        options: {
          method: "GET",
        },
      });
      user = data;
    } catch (err) {
      console.error(err);
    }

    return Promise.resolve(user);
  }
}

export const usersApi = new UsersApi();
