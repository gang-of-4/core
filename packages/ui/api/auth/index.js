import { decode } from '../../utils/jwt';
import { api } from '../../config';

class AuthApi {

  async signUp(request, endpoint) {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      passwordConfirmation
    } = request;

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(
          `${api.url}${endpoint}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              first_name: firstName,
              last_name: lastName,
              email: email,
              phone: phone,
              password: password,
              password_confirmation: passwordConfirmation
            })
          });

        if (!res.ok) {
          reject(new Error(data.message));
          return;
        }
        // @todo sign up does NOT sign you in directly

        const data = await res.json();
        const user = data.user;

        resolve({ user });

      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async signIn(request, endpoint) {
    const { email, password } = request;

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(
          `${api.url}${endpoint}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email,
              password
            })
          });

        if (!res.ok) {
          reject(new Error(data.message));
          return;
        }

        const data = await res.json();
        const accessToken = data.access_token;

        resolve({ accessToken });

      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async vendorSignUp(request) {
    return await this.signUp(request, '/auth/vendor/register');
  };

  async vendorSignIn(request) {
    return await this.signIn(request, '/auth/vendor/login');
  }

  async customerSignUp(request) {
    return await this.signUp(request, '/auth/customer/register');
  }

  async customerSignIn(request) {
    return await this.signIn(request, '/auth/customer/login');
  }

  async adminSignIn(request) {
    return await this.signIn(request, '/auth/admin/login');
  }

  me(request) {
    const { accessToken } = request;

    return new Promise(async (resolve, reject) => {
      try {
        // Decode access token
        const { user } = await decode(accessToken);

        if (!user) {
          reject(new Error('Invalid authorization token'));
          return;
        }

        resolve({
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
          emailVerefiedAt: user.email_verefied_at,
          deletedAt: user.deleted_at
        });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

}

export const authApi = new AuthApi();
