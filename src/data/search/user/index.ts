import { flockFindParams } from '../flock';
import { projectFindParams } from '../project';
import { propertyFindParams } from '../property';
import type { FindOptionsSelect } from 'typeorm';
import type { UserEntity } from '@entity/user';

export const userFindParams: FindOptionsSelect<UserEntity> = {
  createdAt: true,
  email: true,
  finishedAt: true,
  flocks: flockFindParams,
  id: true,
  name: true,
  phone: true,
  projects: projectFindParams,
  properties: propertyFindParams,
  role: true,
  updatedAt: true
};
