import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  preUrl: string = `${environment.apiUrl}/products`;
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<Product[]>(this.preUrl);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get<Product>(`${this.preUrl}/${id}`);
  }

  addProduct(title: string, description: string): Observable<any> {
    return this.http.post<Product>(this.preUrl, { title, description: description || '' });
  }

  deleteProducts(ids: string[] = []) {
    const url = `${this.preUrl}/${ids.join(',')}`
    return this.http.delete<Product>(url);
  }
}
