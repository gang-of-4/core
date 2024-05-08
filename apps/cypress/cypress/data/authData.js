const user = {
  firstName: "John",
  lastName: "Doe",
  email: `${Date.now()}@example.com`,
  password: "Password123!",
};

const vendor = {
  ...user,
  email: `v.${user.email}`,
};

const admin = {
  email: "admin@example.com",
  password: "Q1W2E3R4",
};

export default { user, vendor, admin };
