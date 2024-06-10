import { DataSource } from '@infra/database';
import { ProjectEntity } from '@domain/entity';

export const projectRepository = DataSource.getRepository(ProjectEntity);
