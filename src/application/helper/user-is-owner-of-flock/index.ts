import { IsNull } from 'typeorm';
import { Role } from '@domain/enum';
import { flockRepository } from '@infra/repository';
import { userNotNull } from '@main/utils';
import type { Request } from 'express';

export const userIsOwnerOfFlock = async (request: Request, flockId?: string): Promise<boolean> => {
  if (request.user.role === Role.ADMIN) return true;

  const flock = await flockRepository.findOne({
    select: { id: true },
    where: {
      finishedAt: IsNull(),
      id: flockId ?? request.params.id,
      ...userNotNull(request.user.id)
    }
  });

  if (flock === null) return false;

  return true;
};
