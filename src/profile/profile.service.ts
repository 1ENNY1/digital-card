import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  // визитка одна, поэтому просто берём первый профиль
  getProfile() {
    return this.prisma.profile.findFirst({ orderBy: { id: 'asc' } });
  }
}
