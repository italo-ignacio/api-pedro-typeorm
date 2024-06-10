import { AddressEntity } from '@domain/entity';
import { DataSource } from '@infra/database';

export const addressRepository = DataSource.getRepository(AddressEntity);
