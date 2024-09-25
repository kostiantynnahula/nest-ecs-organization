import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const organizationName = 'Synevo';

  const organization = await prisma.organization.findFirst({
    where: { name: organizationName },
  });

  if (!organization) {
    const result = await prisma.organization.create({
      data: {
        name: organizationName,
        description: 'Synevo is a medical laboratory',
      },
    });

    console.log('Created organization:', result);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
