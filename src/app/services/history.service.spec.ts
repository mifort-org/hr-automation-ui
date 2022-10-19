import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommentData } from '../models/commentData';
import { NotificationService } from './notification.service';
import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let spectator: SpectatorHttp<HistoryService>;
  let handlerSpy: jest.SpyInstance;
  const requestUrl = `${environment.baseAPIUrl}/candidates/1/history`;
  const error = { statusText: 'error', status: 500 };
  let errorResponse = new HttpErrorResponse({ statusText: 'error', status: 500, url: requestUrl });
  const createHttp = createHttpFactory({
    service: HistoryService,
    providers: [NotificationService, MatSnackBar, Overlay],
  });

  beforeEach(() => {
    spectator = createHttp();
    handlerSpy = jest.spyOn(spectator.service, 'errorHandler');
  });

  describe('create service', () => {
    it('should be created', () => {
      expect(spectator).toBeTruthy();
    });
  });

  describe('getCandidateHistoryById', () => {
    it('should get candidate history with id', () => {
      spectator.service.getCandidateHistoryById('1').subscribe();
      spectator.expectOne(requestUrl, HttpMethod.GET).flush('', error);
      expect(handlerSpy).toHaveBeenCalledWith(spectator.service.notification, errorResponse);
    });
  });

  describe('updateCandidateHistory', () => {
    it('should update candidate history', () => {
      const commentData: CommentData = { comment: 'string', id: 1, archived: false };
      spectator.service.updateCandidateHistory('1', commentData).subscribe();
      spectator.expectOne(requestUrl, HttpMethod.PATCH).flush('', error);
      expect(handlerSpy).toHaveBeenCalledWith(spectator.service.notification, errorResponse);
    });
  });

  describe('createNewCandidateHistory', () => {
    it('should create new candidate history', () => {
      const commentData: CommentData = { comment: 'string', id: 1, archived: false };
      spectator.service.createNewCandidateHistory(commentData, '1').subscribe();
      spectator.expectOne(requestUrl, HttpMethod.POST).flush('', error);
      expect(handlerSpy).toHaveBeenCalledWith(spectator.service.notification, errorResponse);
    });
  });

  describe('deleteCandidateHistory', () => {
    it('should delete candidate history', () => {
      errorResponse = new HttpErrorResponse({
        statusText: 'error',
        status: 500,
        url: `${requestUrl}/string`,
      });
      spectator.service.deleteCandidateHistory('1', 'string').subscribe();
      spectator.expectOne(`${requestUrl}/string`, HttpMethod.DELETE).flush('', error);
      expect(handlerSpy).toHaveBeenCalledWith(spectator.service.notification, errorResponse);
    });
  });
});
