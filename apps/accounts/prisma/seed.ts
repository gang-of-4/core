import { PrismaClient } from '@prisma/client/accounts';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
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
    ],
    skipDuplicates: true,
  });

  await prisma.user.create({
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
  console.log(role);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
