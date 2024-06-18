import { DataSource as TypeOrmDataSource } from 'typeorm';
import { env } from '@main/config/env';

const rootPath = typeof process.env.TS_NODE_DEV === 'undefined' ? 'build' : 'src';

const { DATABASE } = env;

export const DataSource = new TypeOrmDataSource({
  database: DATABASE.name,
  entities: [`${rootPath}/domain/entity/**/*`],
  host: DATABASE.host,
  logging: [],
  password: DATABASE.password,
  port: Number(DATABASE.port),
  ssl: DATABASE.ssl,
  synchronize: DATABASE.synchronize,
  type: 'postgres',
  username: DATABASE.userName
});
