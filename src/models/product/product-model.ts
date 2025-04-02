export interface IProductDto {
  name: string;
  description: string;
  price: number;
  discount?: number;
  categoryId: number;
  stock: number;
}

export interface IProductDb {
  name: string;
  description: string;
  categoryId: number;
  price: number;
  discount?: number;
  stock: number;
}

export interface IProductResponseDb {
  uuid: string;
  name: string;
  stock: number;
}
