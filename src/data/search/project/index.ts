import { propertyFindParams } from '../property';
import { userFindParams } from '../user';
import type { FindOptionsSelect } from 'typeorm';
import type { FlockEntity } from '@entity/flock';

export const projectFindParams: FindOptionsSelect<FlockEntity> = {
  createdAt: true,
  finishedAt: true,
  id: true,
  name: true,
  property: propertyFindParams,
  updatedAt: true,
  user: userFindParams
};
