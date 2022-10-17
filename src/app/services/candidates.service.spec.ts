import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { environment } from '../../environments/environment';
import { CandidatesFilterData } from '../models/candidatesFilterData';
import { NotificationService } from './notification.service';
import { CandidatesService } from './candidates.service';

describe('CandidatesService', () => {
  let spectator: SpectatorHttp<CandidatesService>;
  let handlerSpy: jest.SpyInstance;
  const error = { statusText: 'error', status: 200 };
  const createHttp = createHttpFactory({
    service: CandidatesService,
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

  describe('getCandidates', () => {
    it('should get candidates', () => {
      interface IParam {
        [param: string]: any;
      }

      const data: CandidatesFilterData = { pageNumber: 1, pageSize: 5, keyword: [''] };
      const param = new HttpParams({ fromObject: data as IParam }).toString();
      const url = `${environment.baseAPIUrl}/candidates?${param}`;
      spectator.service.getCandidates(data).subscribe();
      spectator.expectOne(url, HttpMethod.GET).flush('', error);
    });
  });

  describe('getCandidateById', () => {
    it('should get candidate by id', () => {
      const url = `${environment.baseAPIUrl}/candidates/1`;
      spectator.service.getCandidateById('1').subscribe();
      spectator.expectOne(url, HttpMethod.GET).flush('', error);
    });
  });

  describe('updateCandidateAttributes', () => {
    it('should update candidate attributes', () => {
      const url = `${environment.baseAPIUrl}/candidates/1/attributes`;
      spectator.service.updateCandidateAttributes('1', { name: 1 }).subscribe();
      spectator.expectOne(url, HttpMethod.POST).flush('', { ...error, status: 500 });
      expect(handlerSpy).toHaveBeenCalledWith(
        spectator.service.notification,
        new HttpErrorResponse({
          ...error,
          status: 500,
          url: `${environment.baseAPIUrl}/candidates/1/attributes`,
        })
      );
    });
  });

  describe('createNewCandidate', () => {
    it('should create new candidate', () => {
      const url = `${environment.baseAPIUrl}/candidates`;
      spectator.service.createNewCandidate({ name: 'test' }).subscribe();
      spectator.expectOne(url, HttpMethod.POST).flush('', { ...error, status: 500 });
      expect(handlerSpy).toHaveBeenCalledWith(
        spectator.service.notification,
        new HttpErrorResponse({
          ...error,
          status: 500,
          url: `${environment.baseAPIUrl}/candidates`,
        })
      );
    });
  });
});
