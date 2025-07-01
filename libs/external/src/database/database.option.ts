const databaseOptions = ['PRISMA', 'DRIZZLE'] as const;

export type DatabaseOption = (typeof databaseOptions)[number];
