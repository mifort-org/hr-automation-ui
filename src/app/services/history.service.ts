import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { CommentData, HistoryElement } from '@src/app/models/history';
import { NotificationService } from '@services/notification.service';
import { defaultErrorhandler } from '@utils/functions';
import { FetchService } from './fetch.service';

interface HistoryElementDto {
  archived: boolean;
  comment: string;
  createDate: string;
  id: number;
  updateDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private fetch: FetchService, private notification: NotificationService) {}

  public getCandidateHistoryById(id: string): Observable<HistoryElement[]> {
    return this.fetch.get<HistoryElementDto[]>(`candidates/${id}/history`).pipe(
      map((data: HistoryElementDto[]) => data.map(this.mapHistoryElement.bind(this))),
      catchError((error) => defaultErrorhandler(this.notification, error))
    );
  }

  public updateCandidateHistory(
    candidateId: string,
    data: CommentData
  ): Observable<HistoryElement> {
    return this.fetch
      .patch<HistoryElementDto>(`candidates/${candidateId}/history`, data)
      .pipe(catchError((error) => defaultErrorhandler(this.notification, error)));
  }

  public createNewCandidateHistory(data: CommentData, id: string): Observable<HistoryElement> {
    return this.fetch
      .post<HistoryElementDto>(`candidates/${id}/history`, data)
      .pipe(catchError((error) => defaultErrorhandler(this.notification, error)));
  }

  public deleteCandidateHistory(id: string, historyId: string): Observable<HistoryElement> {
    return this.fetch
      .delete<HistoryElementDto>(`candidates/${id}/history/${historyId}`)
      .pipe(catchError((error) => defaultErrorhandler(this.notification, error)));
  }

  public mapHistoryElement(historyElement: HistoryElementDto): HistoryElement {
    return historyElement;
  }
}
