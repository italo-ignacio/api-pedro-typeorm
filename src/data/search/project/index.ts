import type { FindOptionsSelect } from 'typeorm';
import type { ProjectEntity } from '@domain/entity';

export const projectFindParams = (
  values: FindOptionsSelect<ProjectEntity>
): FindOptionsSelect<ProjectEntity> => ({
  createdAt: true,
  finishedAt: true,
  id: true,
  name: true,
  updatedAt: true,
  ...values
});
