import { DataSource } from '@infra/database';
import { FlockEntity } from '@entity/flock';

export const flockRepository = DataSource.getRepository(FlockEntity);
