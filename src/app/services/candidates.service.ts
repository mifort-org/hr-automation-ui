import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICandidatesFilterData, ICandidate } from '@interfaces/candidates';
import { FetchService } from './fetch.service';

interface IParam {
  [param: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  constructor(private _fetch: FetchService) {}

  getCandidates(filterData: ICandidatesFilterData): any {
    const param = new HttpParams({ fromObject: filterData as IParam }).toString();

    return this._fetch.get<ICandidate[]>(`candidates?${param}`);
  }

  getCandidateById(id: string): any {
    return this._fetch.get(`candidates/${id}`);
  }
}
