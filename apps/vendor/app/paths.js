export const paths = {
  index: '/',
  auth: {
    jwt: {
      login: '/auth/login',
      register: '/auth/signup'
    },
  },
  dashboard: {
    index: '/dashboard',
    stores: {
      index: '/dashboard/stores',
    }
  },
  errors: {
    forbidden: '/404',
  },
};
