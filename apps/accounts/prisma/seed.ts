import { PrismaClient } from '@prisma/client/accounts';
import roles from './seeds/roles.seed';
import users from './seeds/users.seed';
import permissions from './seeds/permissions.seed';

const prisma = new PrismaClient();

async function main() {
  await roles(prisma);
  await users(prisma);
  await permissions(prisma);
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
