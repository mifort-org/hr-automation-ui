import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';

interface IOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  withCredentials?: boolean;
}

const GLOBAL_OPTIONS: IOptions = {};

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  private baseUrl = environment.baseAPIUrl;

  constructor(private http: HttpClient) {}

  public get<T>(url: string, options?: IOptions) {
    const optionsObject = options ? { ...GLOBAL_OPTIONS, ...options } : GLOBAL_OPTIONS;
    return this.http.get<T>(`${this.baseUrl}/${url}`, optionsObject);
  }

  public post<T>(url: string, data: any, options?: IOptions) {
    const optionsObject = options ? { ...GLOBAL_OPTIONS, ...options } : GLOBAL_OPTIONS;
    return this.http.post<T>(`${this.baseUrl}/${url}`, data, optionsObject);
  }

  public patch<T>(url: string, data: any, options?: IOptions) {
    const optionsObject = options ? { ...GLOBAL_OPTIONS, ...options } : GLOBAL_OPTIONS;
    return this.http.patch<T>(`${this.baseUrl}/${url}`, data, optionsObject);
  }

  public delete<T>(url: string, options?: IOptions) {
    const optionsObject = options ? { ...GLOBAL_OPTIONS, ...options } : GLOBAL_OPTIONS;
    return this.http.delete<T>(`${this.baseUrl}/${url}`, optionsObject);
  }
}
