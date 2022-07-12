import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CandidateAttributesTypes } from '@interfaces/attributes';
import { CandidatesFilterData, CandidateCustomAttribute, Candidate } from '@interfaces/candidates';
import { FetchService } from './fetch.service';

interface IParam {
  [param: string]: any;
}

interface CandidateAttributesTypesDto {
  id: number;
  name: string;
  basicType: string;
  validation: string;
  identifier: boolean;
  value: string;
}

const createCustomAttribute = (candidate: Candidate) => {
  const attributes: CandidateCustomAttribute = {};
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
  currentCandidate!: Candidate;

  constructor(private _fetch: FetchService) {}

  getCandidates(filterData: CandidatesFilterData): any {
    const param = new HttpParams({ fromObject: filterData as IParam }).toString();

    return this._fetch.get<Candidate[]>(`candidates?${param}`).pipe(
      map((data: Candidate[]) => {
        const modifiedData = data?.map((candidate) => createCustomAttribute(candidate));

        return modifiedData;
      })
    );
  }

  getCandidateById(id: string): any {
    return this._fetch.get<Candidate>(`candidates/${id}`).pipe(
      map((data) => {
        const modifiedData = createCustomAttribute(data);
        this.currentCandidate = modifiedData;
        return modifiedData;
      })
    );
  }

  getCandidateAttributesById(id: string): Observable<Array<CandidateAttributesTypes>> {
    return this._fetch.get<Array<CandidateAttributesTypesDto>>(`candidates/${id}/attributes`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  updateCandidateAttributes(id: string, data: any) {
    return this._fetch.post(`candidates/${id}/attributes`, data);
  }

  createNewCandidate(data: any) {
    return this._fetch.post(`candidates`, data);
  }
}
