import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../shared/enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient : HttpClient) { }
  gatAllCategories(): Observable<any>{
    return this.httpClient.get(environments.baseUrl + `/api/v1/categories`)
  }
  gatSpecificCategories(id: string): Observable<any>{
    return this.httpClient.get(environments.baseUrl + `/api/v1/categories/${id}`)
  }
}
