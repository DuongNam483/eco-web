import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../enviroments/enviroment";
import { Category } from "../models/category";
import { ApiResponse } from "../responses/api.response";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiGetCategories = `${environment.apiBaseUrl}/categories`;

  constructor(private http: HttpClient) {}

  getCategories(page: number, limit: number): Observable<ApiResponse> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());
    return this.http.get<ApiResponse>(this.apiGetCategories, { params });
  }
}
