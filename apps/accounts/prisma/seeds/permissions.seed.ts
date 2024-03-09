const permissions = [
  {
    name: 'auth.register.customer',
    activities: [
      {
        method: 'POST',
        url: '/auth/customer/register',
      },
    ],
    roles: ['guest'],
  },
  {
    name: 'auth.register.vendor',
    activities: [
      {
        method: 'POST',
        url: '/auth/vendor/register',
      },
    ],
    roles: ['guest'],
  },
  {
    name: 'auth.login.vendor',
    activities: [
      {
        method: 'POST',
        url: '/auth/vendor/login',
      },
    ],
    roles: ['guest'],
  },
  {
    name: 'auth.login.customer',
    activities: [
      {
        method: 'POST',
        url: '/auth/customer/login',
      },
    ],
    roles: ['guest'],
  },
  {
    name: 'auth.login.vendor',
    activities: [
      {
        method: 'POST',
        url: '/auth/vendor/login',
      },
    ],
    roles: ['guest'],
  },
  {
    name: 'auth.login.admin',
    activities: [
      {
        method: 'POST',
        url: '/auth/admin/login',
      },
    ],
    roles: ['guest'],
  },
  {
    name: 'stores.list',
    activities: [
      {
        method: 'GET',
        url: '/stores',
      },
    ],
    roles: ['admin', 'vendor', 'customer', 'guest'],
  },
  {
    name: 'stores.get',
    activities: [
      {
        method: 'GET',
        url: '/stores/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}',
      },
    ],
    roles: ['admin', 'vendor', 'customer', 'guest'],
  },
  {
    name: 'stores.create',
    activities: [
      {
        method: 'POST',
        url: '/stores',
      },
    ],
    roles: ['admin', 'vendor'],
  },
  {
    name: 'stores.update',
    activities: [
      {
        method: 'PUT',
        url: '/stores/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}',
      },
    ],
    roles: ['admin', 'vendor'],
  },
  {
    name: 'stores.delete',
    activities: [
      {
        method: 'DELETE',
        url: '/stores/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}',
      },
    ],
    roles: ['admin', 'vendor'],
  },
];

export default async function (prisma) {
  const roles = await prisma.role.findMany();
  const rolesObject = roles.reduce((obj, role) => {
    obj[role.name] = { id: role.id, created_at: role.created_at };
    return obj;
  }, {});

  try {
    for (const permission of permissions) {
      // Create a new permission
      const created = await prisma.permission.create({
        data: {
          name: permission.name,
          activities: {
            create: permission.activities.map((entry) => ({
              activity: {
                create: {
                  method: entry.method.trim().toUpperCase(),
                  url: entry.url.trim(),
                },
              },
            })),
          },
          roles: {
            create: permission.roles.map((role) => ({
              role: {
                connect: { id: rolesObject[role].id },
              },
            })),
          },
        },
      });

      console.log('New permission created with related roles and activities:', {
        created,
      });
    }
  } catch (error) {
    console.error('Error creating permission:', error);
  }
}
