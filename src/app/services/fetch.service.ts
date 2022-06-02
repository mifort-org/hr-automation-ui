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

  constructor(private _http: HttpClient) {}

  get<T>(url: string, options?: IOptions) {
    const optionsObject = options ? { ...GLOBAL_OPTIONS, ...options } : GLOBAL_OPTIONS;
    return this._http.get<T>(`${this.baseUrl}/${url}`, optionsObject);
  }

  post(url: string, data: any, options?: IOptions) {
    const optionsObject = options ? { ...GLOBAL_OPTIONS, ...options } : GLOBAL_OPTIONS;
    return this._http.post(`${this.baseUrl}/${url}`, data, optionsObject);
  }

  put(url: string, data: any, options?: IOptions) {
    const optionsObject = options ? { ...GLOBAL_OPTIONS, ...options } : GLOBAL_OPTIONS;
    return this._http.put(`${this.baseUrl}/${url}`, data, optionsObject);
  }
}
