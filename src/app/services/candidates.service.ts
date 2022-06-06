import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
  ICandidatesFilterData,
  ICandidateCustomAttribute,
  ICandidate,
} from '@interfaces/candidates';
import { FetchService } from './fetch.service';

interface IParam {
  [param: string]: any;
}

const createCustomAttribute = (candidate: ICandidate) => {
  const attributes: ICandidateCustomAttribute = {};
  candidate?.candidateAttributes?.forEach((attr) => {
    attributes[attr.attributeTypes.name] = {
      ...attr,
      ...attr?.attributeTypes,
    };
  });

  return {
    ...candidate,
    customAttribute: attributes,
  };
};

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  currentCandidate!: ICandidate;

  constructor(private _fetch: FetchService) {}

  getCandidates(filterData: ICandidatesFilterData): any {
    const param = new HttpParams({ fromObject: filterData as IParam }).toString();

    return this._fetch.get<ICandidate[]>(`candidates?${param}`).pipe(
      map((data: ICandidate[]) => {
        const modifiedData = data?.map((candidate) => createCustomAttribute(candidate));

        return modifiedData;
      })
    );
  }

  getCandidateById(id: string): any {
    return this._fetch.get<ICandidate>(`candidates/${id}`).pipe(
      map((data) => {
        this.currentCandidate = createCustomAttribute(data);
        return data;
      })
    );
  }

  updateCandidateAttributes(id: string, data: any) {
    return this._fetch.post(`candidates/${id}/attributes`, data);
  }
}
