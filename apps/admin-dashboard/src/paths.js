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
    },
    catalog: {
      index: '/dashboard/catalog',
      items: {
        index: '/dashboard/catalog/items',
      },
      categories: {
        index: '/dashboard/catalog/categories',
      },
      options: {
        index: '/dashboard/catalog/options',
        groups: {
          index: '/dashboard/catalog/options/groups',
          add: '/dashboard/catalog/options/groups/add',
        },
      },
    },
  },
  errors: {
    forbidden: '/404',
  },
};
