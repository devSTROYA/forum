import { TransactionalAdapterDrizzleOrm } from '@nestjs-cls/transactional-adapter-drizzle-orm';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { PrismaClient } from '@prisma/client';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './adapters/drizzle/schema';

export class PrismaAdapter extends TransactionalAdapterPrisma<PrismaClient> {}
export class DrizzleAdapter extends TransactionalAdapterDrizzleOrm<NodePgDatabase<typeof schema>> {}
