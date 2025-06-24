import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { PrismaService } from './adapters/prisma';

export class PrismaAdapter extends TransactionalAdapterPrisma<PrismaService> {}
