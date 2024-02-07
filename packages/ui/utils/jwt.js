// eslint-disable no-bitwise
export const JWT_SECRET = 'aaa-top-secret-key';
export const JWT_EXPIRES_IN = 3600 * 24 * 2; // 2 days

// decode JWT token
export const decode = async (token) => {
  const [encodedHeader, encodedPayload] = token.split('.');

  const header = await JSON.parse(atob(encodedHeader));
  const payload = await JSON.parse(atob(encodedPayload));
  const now = new Date();

  if (header.expiresIn && now < header.expiresIn) {
    throw new Error('Expired token');
  }

  return payload;
};