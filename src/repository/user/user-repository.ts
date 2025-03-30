import { Pool, PoolClient, QueryResult } from "pg";
import { ISignupDbResponse, IUserDb } from "../../models/user/user-model";

export const findUserByEmail = (email: string, dbPool: Pool | PoolClient) => {
  const query = `select email from "user" where email = $1`;
  return dbPool.query(query, [email]);
};

export const createUser = (
  { name, email }: IUserDb,
  password: string,
  uuidAddress: string,
  dbPool: Pool | PoolClient
): Promise<QueryResult<ISignupDbResponse>> => {
  const query = `
    insert into "user" ( name, email, password, address_uuid_fk)
    values ($1, $2, $3, $4)
    returning uuid, (select name from public.role where id = role_id_fk) as role`;

  const values = [name, email, password, uuidAddress];

  return dbPool.query(query, values);
};
