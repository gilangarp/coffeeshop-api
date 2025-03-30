import { Pool, PoolClient, QueryResult } from "pg";
import {
  IAddressDb,
  IAddressResponseDb,
} from "../../models/user/address-model";
import db from "../../configs/pg";

export const createAddress = (
  { city, country, street, postal_code, state }: IAddressDb,
  dbPool: Pool | PoolClient
): Promise<QueryResult<{ uuid: string }>> => {
  const query = `  
    insert into "address" (city, country, street, postal_code, state)
    values ($1, $2, $3, $4, $5)
    returning uuid;`;
  const values = [city, country, street, postal_code, state];

  return dbPool.query(query, values);
};

export const updateUser = (
  uuidAddress: string,
  uuid: string
): Promise<QueryResult<IAddressResponseDb>> => {
  console.log(uuidAddress);
  const query = `update "user" u 
set address_uuid_fk = $1 
from "role" r 
where u.role_id_fk = CAST(r."name" AS INTEGER) 
and u."uuid" = $2
returning r."name" as role
`;

  const values = [uuidAddress, uuid];
  return db.query(query, values);
};
