import { IProducto } from "./producto.interface";

export interface IResponse {
      message:string,
      amount:number,
      body: IProducto[]
}