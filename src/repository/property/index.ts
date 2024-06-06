import { DataSource } from '@infra/database';
import { PropertyEntity } from '@entity/property';

export const propertyRepository = DataSource.getRepository(PropertyEntity);
