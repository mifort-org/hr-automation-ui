import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { ICandidatesFilterData } from '@interfaces/candidates';
import { FetchService } from './fetch.service';

interface IParam {
  [param: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  private baseUrl = environment.baseAPIUrl;

  constructor(private _fetch: FetchService) {}

  getCandidates(filterData: ICandidatesFilterData): any {
    const param = new HttpParams({ fromObject: filterData as IParam }).toString();

    return this._fetch.get(`${this.baseUrl}/candidates?${param}`);
  }
}
