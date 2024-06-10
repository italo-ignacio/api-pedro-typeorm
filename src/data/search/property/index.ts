import { addressFindParams } from '../address';
import type { FindOptionsSelect } from 'typeorm';
import type { PropertyEntity } from '@entity/property';

export const propertyFindParams = (
  values: FindOptionsSelect<PropertyEntity>
): FindOptionsSelect<PropertyEntity> => ({
  address: addressFindParams({}),
  createdAt: true,
  finishedAt: true,
  id: true,
  name: true,
  totalArea: true,
  updatedAt: true,
  ...values
});
