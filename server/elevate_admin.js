const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.user.updateMany({
    where: { email: 'hannhu3003@gmail.com' },
    data: { role: 'ADMIN' }
  });
  console.log('UPDATED_HANNHU3003_TO_ADMIN:', updated.count);
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
