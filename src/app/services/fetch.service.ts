import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  constructor(private _http: HttpClient) {}

  get(url: string, options?: IOptions) {
    const optionsObject = options ? { ...GLOBAL_OPTIONS, ...options } : GLOBAL_OPTIONS;
    return this._http.get(url, optionsObject);
  }

  post(url: string, data: any, options?: IOptions) {
    const optionsObject = options ? { ...GLOBAL_OPTIONS, ...options } : GLOBAL_OPTIONS;
    return this._http.post(url, data, optionsObject);
  }

  put(url: string, data: any, options?: IOptions) {
    const optionsObject = options ? { ...GLOBAL_OPTIONS, ...options } : GLOBAL_OPTIONS;
    return this._http.put(url, data, optionsObject);
  }
}
