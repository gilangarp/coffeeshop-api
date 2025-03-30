import { IBasicResponse } from "../other/basic-model";

export interface IAuthDto {
  email: string;
  password: string;
}

export interface IAuthDataResponse {
  token: string;
  role: string;
  uuid: string;
  is_new_user?: boolean;
}

export interface IAuthResponseDb {
  uuid: string;
  role: string;
  hash: string;
  address: string;
  is_deleted: boolean;
}

export interface IAuthResponse extends IBasicResponse {
  data: IAuthDataResponse;
}
