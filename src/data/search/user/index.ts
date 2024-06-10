import type { FindOptionsSelect } from 'typeorm';
import type { UserEntity } from '@domain/entity';

export const userFindParams = (
  values: FindOptionsSelect<UserEntity>
): FindOptionsSelect<UserEntity> => ({
  createdAt: true,
  email: true,
  finishedAt: true,
  id: true,
  name: true,
  phone: true,
  role: true,
  updatedAt: true,
  ...values
});
