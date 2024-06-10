import { DataSource } from '@infra/database';
import { UserEntity } from '@domain/entity';

export const userRepository = DataSource.getRepository(UserEntity);
