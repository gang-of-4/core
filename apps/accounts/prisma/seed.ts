import { PrismaClient } from '@prisma/client';

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
        name: 'user',
      },
    ],
    skipDuplicates: true,
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