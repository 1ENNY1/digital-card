import { PrismaClient } from '@prisma/client';
import { seedData } from './seed-data';

const prisma = new PrismaClient();

async function main() {
  const { profile, skills, experiences, projects } = seedData;

  // пересоздаём профиль целиком, чтобы повторный запуск не дублировал данные
  await prisma.$transaction(async (tx) => {
    await tx.profile.deleteMany();
    await tx.profile.create({
      data: {
        ...profile,
        skills: { create: skills.map((name, sortOrder) => ({ name, sortOrder })) },
        experiences: { create: experiences },
        projects: { create: projects.map((p, sortOrder) => ({ ...p, sortOrder })) },
      },
    });
  });

  console.log('seed done');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
