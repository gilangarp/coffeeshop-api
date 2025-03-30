import { IBasicResponse } from "../other/basic-model";

export interface IAddressDto {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface IAddressParam {
  uuid: string;
}

export interface IAddressResponseDb {
  role: string;
}

export interface IAddressDb {
  street: string;
  city: string;
  state?: string;
  postal_code?: string;
  country: string;
}

export interface IAddressDataResponse {
  token: string;
  role: string;
  uuid: string;
  is_new_user?: boolean;
}

export interface IAddressResponse extends IBasicResponse {
  data: IAddressDataResponse;
}
