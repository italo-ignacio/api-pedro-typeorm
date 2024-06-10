import { DataSource } from '@infra/database';
import { PropertyEntity } from '@domain/entity';

export const propertyRepository = DataSource.getRepository(PropertyEntity);
