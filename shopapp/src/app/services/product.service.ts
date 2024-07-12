import { Injectable } from "@angular/core";
import { environment } from "../enviroments/enviroment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product";
import { ApiResponse } from "../responses/api.response";

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  getProducts(
    keyword: string,
    categoryId: number,
    page: number,
    limit: number
  ): Observable<ApiResponse> {
    const params = {
      keyword: keyword,
      category_id: categoryId.toString(),
      page: page.toString(),
      limit: limit.toString()
    };
    return this.http.get<ApiResponse>(`${this.apiBaseUrl}/products`, { params });
  }

  getDetailProduct(productId: number){
    return this.http.get(`${environment.apiBaseUrl}/products/${productId}`);
  }
}
