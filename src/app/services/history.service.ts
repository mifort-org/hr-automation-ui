import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HistoryElement } from '@src/app/models/historyElement';
import { NotificationService } from '@services/notification.service';
import { defaultErrorhandler } from '@utils/functions';
import { CommentData } from '../models/commentData';
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
  public errorHandler = defaultErrorhandler;

  constructor(private fetch: FetchService, public notification: NotificationService) {}

  public getCandidateHistoryById(id: string): Observable<HistoryElement[]> {
    return this.fetch
      .get<HistoryElementDto[]>(`candidates/${id}/history`)
      .pipe(catchError((error) => this.errorHandler(this.notification, error)));
  }

  public updateCandidateHistory(
    candidateId: string,
    data: CommentData
  ): Observable<HistoryElement> {
    return this.fetch
      .patch<HistoryElementDto>(`candidates/${candidateId}/history`, data)
      .pipe(catchError((error) => this.errorHandler(this.notification, error)));
  }

  public createNewCandidateHistory(data: CommentData, id: string): Observable<HistoryElement> {
    return this.fetch
      .post<HistoryElementDto>(`candidates/${id}/history`, data)
      .pipe(catchError((error) => this.errorHandler(this.notification, error)));
  }

  public deleteCandidateHistory(id: string, historyId: string): Observable<HistoryElement> {
    return this.fetch
      .delete<HistoryElementDto>(`candidates/${id}/history/${historyId}`)
      .pipe(catchError((error) => this.errorHandler(this.notification, error)));
  }
}
