import { Pool, PoolConfig } from "pg";

const config: PoolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT as string) || 5432,
};

const db = new Pool(config);

export default db;
