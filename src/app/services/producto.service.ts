import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IResponse } from '../interfaces/response.interface';
import { IProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  apiProducts: string = 'api/products/';

  constructor(private http: HttpClient) { }

  getProducts():Observable<IResponse>{
    return this.http.get<IResponse>(`${environment.endpoint}${this.apiProducts}`)
  }

  getProduct(id:number):Observable<IResponse>{
    return this.http.get<IResponse>(`${environment.endpoint}${this.apiProducts}${id}`)
  }

  deleteProduct(id:number):Observable<IResponse>{
    return this.http.delete<IResponse>(`${environment.endpoint}${this.apiProducts}${id}`)
  }

  addProduct(body:IProducto):Observable<IResponse>{
    return this.http.post<IResponse>(`${environment.endpoint}${this.apiProducts}`,body)
  }

  editProduct(id:number,body:IProducto):Observable<IResponse>{
    return this.http.put<IResponse>(`${environment.endpoint}${this.apiProducts}${id}`,body)
  }
}
