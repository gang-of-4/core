export const paths = {
  index: "/",
  auth: {
    jwt: {
      login: "/auth/login",
      register: "/auth/signup",
    },
  },
  dashboard: {
    index: "/dashboard",
    stores: {
      index: "/dashboard/stores",
    },
    catalog: {
      index: "/dashboard/catalog",
      items: {
        index: "/dashboard/catalog/items",
      },
      categories: {
        index: "/dashboard/catalog/categories",
        add: "/dashboard/catalog/categories/add",
      },
      options: {
        index: "/dashboard/catalog/options",
        groups: {
          index: "/dashboard/catalog/options/groups",
          add: "/dashboard/catalog/options/groups/add",
        },
      },
    },
    orders: {
      index: '/dashboard/orders',
    }
  },
  errors: {
    forbidden: "/404",
  },
};
