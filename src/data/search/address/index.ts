import type { AddressEntity } from '@entity/address';
import type { FindOptionsSelect } from 'typeorm';

export const addressFindParams = (
  values: FindOptionsSelect<AddressEntity>
): FindOptionsSelect<AddressEntity> => ({
  city: true,
  createdAt: true,
  finishedAt: true,
  id: true,
  number: true,
  state: true,
  street: true,
  updatedAt: true,
  zipCode: true,
  ...values
});
