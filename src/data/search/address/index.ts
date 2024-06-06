import { propertyFindParams } from '../property';
import type { AddressEntity } from '@entity/address';
import type { FindOptionsSelect } from 'typeorm';

export const addressFindParams: FindOptionsSelect<AddressEntity> = {
  city: true,
  createdAt: true,
  finishedAt: true,
  id: true,
  municipality: true,
  number: true,
  property: propertyFindParams,
  state: true,
  street: true,
  updatedAt: true,
  zipCode: true
};
