import { Pool, PoolClient, QueryResult } from "pg";
import {
  IProductDb,
  IProductResponseDb,
} from "../../models/product/product-model";

export const createDataProduct = (
  { categoryId, description, discount, name, price, stock }: IProductDb,
  dbPool: Pool | PoolClient
): Promise<QueryResult<IProductResponseDb>> => {
  const query = `insert into product ( name, description, price, discount, category_id_fk, stock)
      values ($1, $2, $3, $4, $5, $6)
      returning uuid ,  name , stock `;

  const values = [name, description, price, discount, categoryId, stock];
  return dbPool.query(query, values);
};

export const createDataImage = (
  uuid: string,
  imgUrl: string,
  dbPool: Pool | PoolClient
): Promise<QueryResult<{ uuid: string }>> => {
  let query = `insert into image ( img , product_uuid_fk)
        values `;
  const values: (string | null)[] = [];
  const imgUrlValue = imgUrl ? `${imgUrl}` : null;
  query += ` ($${values.length + 1}, $${values.length + 2})`;
  values.push(imgUrlValue, uuid);
  query += ` returning product_uuid_fk as uuid`;
  return dbPool.query(query, values);
};
