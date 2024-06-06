import { AddressEntity } from '@entity/address';
import { DataSource } from '@infra/database';

export const addressRepository = DataSource.getRepository(AddressEntity);
