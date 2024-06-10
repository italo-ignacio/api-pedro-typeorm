import type { FindOptionsSelect } from 'typeorm';
import type { FlockEntity } from '@entity/flock';

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
