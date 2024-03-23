const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: `${Date.now()}@example.com`,
    password: 'Password123!'
};

const vendor = {
    ...user,
    email: `v.${user.email}`,
}

const admin = {
    email: 'admin@example.com',
    password: 'Q1W2E3R4'
};

const businessStore = {
    storeName: `${Date.now()}`,
    vatNumber: '123456789',
    crNumber: '123456789',
    ownerNationalId: '123456789'
};

export default { user, vendor, admin, businessStore };