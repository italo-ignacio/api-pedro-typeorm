import { DataSource } from '@infra/database';
import { ProjectEntity } from '@entity/project';

export const projectRepository = DataSource.getRepository(ProjectEntity);
