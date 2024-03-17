// types.ts
import { PrismaClient } from '@prisma/client';

interface CustomPrismaClient extends PrismaClient {
  home: {
    findFirst: any; // Define the correct type for this method
    create: any; // Define the correct type for this method
    // Add other methods if necessary
  };
}

export type { CustomPrismaClient };
