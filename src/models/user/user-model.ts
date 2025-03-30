import { IBasicResponse } from "../other/basic-model";
import { IAddressDto } from "./address-model";

export interface ISignupDto extends IAddressDto {
  name: string;
  email: string;
  password: string;
}

export interface IUserDb {
  name: string;
  email: string;
  password: string;
  address_uuid_fk?: string;
}

export interface ISignupDbResponse {
  uuid: string;
  role: string;
}

export interface IRegisterDataResponse {
  token: string;
  uuid: string;
  role: string;
}

export interface IRegisterResponse extends IBasicResponse {
  data?: IRegisterDataResponse;
}
