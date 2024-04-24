import { decode } from "../../utils/jwt";

class AuthApi {
  async signIn(request) {
    const { email, password } = request;

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`/admin/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          reject(new Error(data.message));
          return;
        }

        const accessToken = data.accessToken;
        resolve({ accessToken });
      } catch (err) {
        console.error("[Auth Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }

  me(request) {
    const { accessToken } = request;

    return new Promise(async (resolve, reject) => {
      try {
        // Decode access token
        const { user } = await decode(accessToken);

        if (!user) {
          reject(new Error("Invalid authorization token"));
          return;
        }

        resolve({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          emailVerefiedAt: user.emailVerefiedAt,
          deletedAt: user.deletedAt,
        });
      } catch (err) {
        console.error("[Auth Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }
}

export const authApi = new AuthApi();
