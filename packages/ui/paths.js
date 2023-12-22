export const paths = {
  index: '/',
  absolutePaths: {
    storefront: '/',
    vendor: '/vendor',
    admin: '/admin',
  },
  admin: {
    index: '/',
    dashboard: {
      index: '/dashboard',
    },
  },
  vendor: {
    index: '/',
    dashboard: {
      index: '/dashboard',
      stores: {
        index: '/dashboard/stores',
        create: 'stores/create',
      }
    },
    onboarding: {
      index: '/onboarding',
    }
  },
  storefront: {
    index: '/',
  },
  auth: {
    login: '/auth/login',
    register: '/auth/signup'
  },
  errors: {
    forbidden: '/404',
  },
  401: '/401',
  404: '/404',
  500: '/500'
};
