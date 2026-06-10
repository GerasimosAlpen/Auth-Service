import 'dotenv/config';
import { PrismaService } from '../src/config/prisma.service';

const prisma = new PrismaService();

async function main() {
  const adminEmail = 'adminalvenis@gmail.com';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        first_name: 'Admin',
        last_name: 'System',
        email: adminEmail,
        password: 'aDmiN122213',
        role: 'ADMIN',
      },
    });
    console.log('Admin account seeded successfully.');
  } else {
    console.log('Admin account already exists.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
