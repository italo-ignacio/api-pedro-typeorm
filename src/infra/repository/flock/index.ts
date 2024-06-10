import { DataSource } from '@infra/database';
import { FlockEntity } from '@domain/entity';

export const flockRepository = DataSource.getRepository(FlockEntity);
