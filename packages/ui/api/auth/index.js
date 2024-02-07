import { decode } from '../../utils/jwt';

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
    try {
      const res = await fetch(
        endpoint,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      const user = data.user;
      return ({ user });

    } catch (err) {
      throw new Error('[Auth Api]: ', err);
    }
  }

  async signIn(request, endpoint) {
    const { email, password } = request;

    try {
      const res = await fetch(
        endpoint,
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
        throw new Error(data.message);
      }

      const accessToken = data.access_token;

      return ({ accessToken });

    } catch (err) {
      throw new Error('[Auth Api]: ', err);
    }
  };

  vendorSignUp({ request, apiURL }) {
    return this.signUp(request, `${apiURL}/vendor/register`);
  };

  vendorSignIn({ request, apiURL }) {
    return this.signIn(request, `${apiURL}/vendor/login`);
  }

  customerSignUp({ request, apiURL }) {
    return this.signUp(request, `${apiURL}/customer/register`);
  }

  customerSignIn({ request, apiURL }) {
    return this.signIn(request, `${apiURL}/customer/login`);
  }

  adminSignIn({ request, apiURL }) {
    return this.signIn(request, `${apiURL}/admin/login`);
  }

  async me(request) {
    const { accessToken } = request;

    try {
      // Decode access token
      const { user } = await decode(accessToken);

      if (!user) {
        throw (new Error('Invalid authorization token'));
      }

      return ({
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
      throw new Error('[Auth Api]: ', err);
    }
  }

}

export const authApi = new AuthApi();
