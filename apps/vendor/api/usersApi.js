const apiUrl = process.env.USERS_API_URL;

class UsersApi {

    async getUser(id) {
        let user;
        try {
            const res = await fetch(`${apiUrl}/${id}`);
            user = await res.json();
        } catch (err) {
            console.error(err);
        }

        return Promise.resolve(user);
    }

}

export const usersApi = new UsersApi();
