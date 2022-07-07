import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Candidate, CandidateCustomAttribute, CandidatesFilterData } from '@interfaces/candidates';
import { FetchService } from './fetch.service';

interface IParam {
  [param: string]: any;
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
  constructor(private fetch: FetchService) {}

  getCandidates(filterData: CandidatesFilterData): any {
    const param = new HttpParams({ fromObject: filterData as IParam }).toString();

    return this.fetch.get<Candidate[]>(`candidates?${param}`).pipe(
      map((data: Candidate[]) => {
        return data?.map((candidate) => createCustomAttribute(candidate));
      })
    );
  }

  getCandidateById(id: string): any {
    return this.fetch.get<Candidate>(`candidates/${id}`).pipe(
      map((data) => {
        return createCustomAttribute(data);
      })
    );
  }

  updateCandidateAttributes(id: string, data: any) {
    return this.fetch.post(`candidates/${id}/attributes`, data);
  }

  createNewCandidate(data: any) {
    return this.fetch.post(`candidates`, data);
  }
}
