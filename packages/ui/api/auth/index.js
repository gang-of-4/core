import { decode } from '../../utils/jwt';
import { api } from '../../config';

class AuthApi {

  async signUp(request, endpoint) {

    let requestBody = {};

    request.phone ? requestBody = {
      ...request,
      phone: request.phone
    } : requestBody = {
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      password: request.password,
      passwordConfirmation: request.passwordConfirmation
    };

    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(
          `${api.url}${endpoint}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });

        const data = await res.json();

        if (!res.ok) {
          reject(new Error(data.message));
          return;
        }

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

        const data = await res.json();
        
        if (!res.ok) {
          reject(new Error(data.message));
          return;
        }

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
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          emailVerefiedAt: user.emailVerefiedAt,
          deletedAt: user.deletedAt
        });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

}

export const authApi = new AuthApi();
