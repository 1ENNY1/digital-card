import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Experience, Project, Skill } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

export interface Loaders {
  skills: DataLoader<number, Skill[]>;
  experiences: DataLoader<number, Experience[]>;
  projects: DataLoader<number, Project[]>;
}

function groupByProfile<T extends { profileId: number }>(ids: readonly number[], rows: T[]): T[][] {
  return ids.map((id) => rows.filter((r) => r.profileId === id));
}

@Injectable()
export class ProfileLoaders {
  constructor(private readonly prisma: PrismaService) {}

  // лоадеры создаются на каждый запрос, чтобы кэш не жил между запросами
  create(): Loaders {
    const db = this.prisma;

    return {
      skills: new DataLoader(async (ids) => {
        const rows = await db.skill.findMany({
          where: { profileId: { in: [...ids] } },
          orderBy: { sortOrder: 'asc' },
        });
        return groupByProfile(ids, rows);
      }),
      experiences: new DataLoader(async (ids) => {
        const rows = await db.experience.findMany({
          where: { profileId: { in: [...ids] } },
          orderBy: { startDate: 'desc' },
        });
        return groupByProfile(ids, rows);
      }),
      projects: new DataLoader(async (ids) => {
        const rows = await db.project.findMany({
          where: { profileId: { in: [...ids] } },
          orderBy: { sortOrder: 'asc' },
        });
        return groupByProfile(ids, rows);
      }),
    };
  }
}
