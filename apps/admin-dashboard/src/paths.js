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
    academy: {
      index: '/dashboard/academy',
      courseDetails: '/dashboard/academy/courses/:courseId'
    },
    stores: {
      index: '/dashboard/stores',
    }
  },
  errors: {
    forbidden: '/404',
  },
};
