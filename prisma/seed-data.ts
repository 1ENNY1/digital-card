export const seedData = {
  profile: {
    name: 'Евгений',
    description:
      'Начинающий backend-разработчик на TypeScript. Базовые знания в основном теоретические, практический опыт пока небольшой. Быстро учусь, регулярно изучаю новые технологии и готов быстро осваивать то, что нужно для работы.',
    github: 'https://github.com/1ENNY1',
    linkedin: null as string | null,
    website: null as string | null,
  },
  skills: ['TypeScript', 'Node.js', 'NestJS', 'GraphQL', 'PostgreSQL', 'Prisma', 'Docker', 'Git'],
  // коммерческого опыта пока нет
  experiences: [] as {
    company: string;
    position: string;
    startDate: Date;
    endDate: Date | null;
    achievements: string[];
  }[],
  projects: [
    {
      name: 'Digital Card',
      url: 'https://github.com/1ENNY1/digital-card',
      description: 'Эта визитка: GraphQL API на NestJS, Prisma и PostgreSQL' as string | null,
    },
  ],
};
