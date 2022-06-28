import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoryElement } from '@interfaces/history';
import { FetchService } from './fetch.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private _fetch: FetchService) {}

  getCandidateHistoryById(id: string): Observable<HistoryElement[]> {
    return this._fetch.get<HistoryElement[]>(`candidates/${id}/history`);
  }

  // Todo  Patch method is not allowed by BE side
  updateCandidateHistory(id: string, data: any): Observable<any> {
    return this._fetch.patch<any>(`candidates/${id}/history`, data);
  }

  createNewCandidateHistory(data: any, id: string): Observable<any> {
    return this._fetch.post<any>(`candidates/${id}/history`, data);
  }

  deleteCandidateHistory(id: string, historyId: string): Observable<any> {
    return this._fetch.delete<any>(`candidates/${id}/history/${historyId}`);
  }
}
