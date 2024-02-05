export default async function (prisma) {
  const role = await prisma.role.createMany({
    data: [
      {
        name: 'admin',
      },
      {
        name: 'vendor',
      },
      {
        name: 'customer',
      },
      {
        name: 'guest',
      },
    ],
    skipDuplicates: true,
  });
  console.log('created roles: ', role);
}
