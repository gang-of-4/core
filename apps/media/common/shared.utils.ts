export const decodeToken = async (token) => {
  if (!token) {
    return {
      user: null,
    };
  }
  const [encodedHeader, encodedPayload, signature] = token.split('.');

  const header = await JSON.parse(atob(encodedHeader));
  const payload = await JSON.parse(atob(encodedPayload));
  const now = new Date();

  if (header.expiresIn && now < header.expiresIn) {
    throw new Error('Expired token');
  }

  return payload;
};
