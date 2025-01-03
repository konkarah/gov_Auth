import {
    CA_CERT,
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '../env';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import { registerAs } from '@nestjs/config';

const config = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  database: POSTGRES_DATABASE,
  password: POSTGRES_PASSWORD,
  entities: [path.join(__dirname, "../**/*.entity{.ts,.js}")],
  migrations: [path.join(__dirname, "../../migrations/*{.ts,.js}")],
  synchronize: false,
  logging: false,
  ssl: {
    ca: CA_CERT
  },
} satisfies DataSourceOptions;

export default registerAs("typeorm", () => config)

export const connectionSource = new DataSource(config)
