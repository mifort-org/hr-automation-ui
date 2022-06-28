import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Candidate } from '@interfaces/candidates';
import { FetchService } from './fetch.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  currentCandidateHistory!: any;

  constructor(private _fetch: FetchService) {}

  getCandidateHistoryById(id: string): any {
    return this._fetch.get<Candidate>(`candidates/${id}/history`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  //  Patch method is not allowed by BE side

  updateCandidateHistory(id: string, data: any) {
    return this._fetch.patch(`candidates/${id}/history`, data);
  }

  createNewCandidateHistory(data: any, id: string) {
    return this._fetch.post(`candidates/${id}/history`, data);
  }

  deleteCandidateHistory(id: string, historyId: string) {
    return this._fetch.delete(`candidates/${id}/history/${historyId}`);
  }
}
