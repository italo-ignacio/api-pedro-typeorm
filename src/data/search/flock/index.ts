import type { FindOptionsSelect } from 'typeorm';
import type { FlockEntity } from '@domain/entity';

export const flockFindParams = (
  values: FindOptionsSelect<FlockEntity>
): FindOptionsSelect<FlockEntity> => ({
  createdAt: true,
  finishedAt: true,
  id: true,
  name: true,
  updatedAt: true,
  ...values
});
