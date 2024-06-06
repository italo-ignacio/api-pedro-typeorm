import { addressFindParams } from '../address';
import { flockFindParams } from '../flock';
import { userFindParams } from '../user';
import type { FindOptionsSelect } from 'typeorm';
import type { PropertyEntity } from '@entity/property';

export const propertyFindParams: FindOptionsSelect<PropertyEntity> = {
  address: addressFindParams,
  createdAt: true,
  finishedAt: true,
  flocks: flockFindParams,
  id: true,
  name: true,
  totalArea: true,
  updatedAt: true,
  user: userFindParams
};
