import { QueryResult } from "pg";
import db from "../../configs/pg";
import { IAuthResponseDb } from "../../models/auth/auth-model";

export const getByEmail = (
  email: string
): Promise<QueryResult<IAuthResponseDb>> => {
  const query = `
    select u.uuid, r."name" as role, u.password as hash, u.address_uuid_fk as address, is_deleted
    from "user" u
    join role r ON u.role_id_fk = r.id
    where u.email = $1`;
  return db.query(query, [email]);
};
