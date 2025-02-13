import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../shared/enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // api call ===> httpclient

  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpClient.get(environments.baseUrl + `/api/v1/products`);
  }

  getSpecificProduct(id: string): Observable<any> {
    return this.httpClient.get(environments.baseUrl + `/api/v1/products/${id}`);
  }
}
