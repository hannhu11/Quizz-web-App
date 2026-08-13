const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log('--- ALL USERS IN DB ---');
  console.log(users.map(u => ({ id: u.id, email: u.email, role: u.role, fullName: u.fullName })));
  
  // Make sure ALL users containing hannhu4002 or admin get ADMIN role
  const updated = await prisma.user.updateMany({
    where: {
      OR: [
        { email: { contains: 'hannhu4002' } },
        { email: { contains: 'admin' } }
      ]
    },
    data: { role: 'ADMIN' }
  });
  console.log('UPDATED_ADMIN_ROLES:', updated.count);
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
