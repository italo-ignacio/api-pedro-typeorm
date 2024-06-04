import type { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user: Pick<
        User,
        'createdAt' | 'email' | 'finishedAt' | 'id' | 'name' | 'phone' | 'role' | 'updatedAt'
      >;
    }
  }
}
