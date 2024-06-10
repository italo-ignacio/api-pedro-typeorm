import { IsNull } from 'typeorm';
import { Role } from '@domain/enum';
import { propertyRepository } from '@infra/repository';
import { userNotNull } from '@main/utils';
import type { Request } from 'express';

export const userIsOwnerOfProperty = async (
  request: Request,
  propertyId?: string
): Promise<boolean> => {
  if (request.user.role !== Role.ADMIN) return true;

  const property = await propertyRepository.findOne({
    select: { id: true },
    where: {
      finishedAt: IsNull(),
      id: propertyId ?? request.params.id,
      ...userNotNull(request.user.id)
    }
  });

  if (property === null) return false;

  return true;
};
