import * as bcrypt from 'bcrypt';

export default async function (prisma) {
  const admin = await prisma.user.create({
    data: {
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@example.com',
      phone: '+966500000000',
      roleId: (
        await prisma.role.findFirst({
          where: { name: 'admin' },
          select: { id: true },
        })
      ).id,
      credentials: {
        create: {
          password: await bcrypt.hash('Q1W2E3R4', 10),
        },
      },
    },
  });
  console.log('created admin user: ', admin);
}
