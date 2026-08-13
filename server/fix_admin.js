const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.user.updateMany({
    where: { email: 'hannhu4002@gmail.com' },
    data: { role: 'ADMIN' }
  });
  console.log('SUCCESS_UPDATE_ADMIN_ROLE_COUNT:', result.count);
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
