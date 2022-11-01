import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FetchService } from './fetch.service';

describe('FetchService', () => {
  let spectator: SpectatorHttp<FetchService>;
  const createHttp = createHttpFactory(FetchService);

  beforeEach(() => {
    spectator = createHttp();
  });

  describe('create service', () => {
    it('should be created', () => {
      expect(spectator).toBeTruthy();
    });
  });

  describe('http methods', () => {
    describe('HTTP get', () => {
      it('GET method should be called without options', () => {
        spectator.service.get('testUrl').subscribe();
        spectator.expectOne(`${environment.baseAPIUrl}/testUrl`, HttpMethod.GET);
      });
      it('GET method should be called with options', () => {
        const headers = new HttpHeaders({ test: 'test' });
        spectator.service.get('testUrl', { headers }).subscribe();
        spectator.expectOne(`${environment.baseAPIUrl}/testUrl`, HttpMethod.GET);
      });
    });

    describe('HTTP post', () => {
      it('POST method should be called without options', () => {
        spectator.service.post('testUrl', { name: 'test' }).subscribe();
        spectator.expectOne(`${environment.baseAPIUrl}/testUrl`, HttpMethod.POST);
      });
      it('POST method should be called with options', () => {
        const headers = new HttpHeaders({ test: 'test' });
        spectator.service.post('testUrl', { name: 'test' }, { headers }).subscribe();
        spectator.expectOne(`${environment.baseAPIUrl}/testUrl`, HttpMethod.POST);
      });
    });

    describe('HTTP patch', () => {
      it('PATCH method should be called without options', () => {
        spectator.service.patch('testUrl', { name: 'test' }).subscribe();
        spectator.expectOne(`${environment.baseAPIUrl}/testUrl`, HttpMethod.PATCH);
      });
      it('PATCH method should be called with options', () => {
        const headers = new HttpHeaders({ test: 'test' });
        spectator.service.patch('testUrl', { name: 'test' }, { headers }).subscribe();
        spectator.expectOne(`${environment.baseAPIUrl}/testUrl`, HttpMethod.PATCH);
      });
    });

    describe('HTTP delete', () => {
      it('DELETE method should be called without options', () => {
        spectator.service.delete('testUrl').subscribe();
        spectator.expectOne(`${environment.baseAPIUrl}/testUrl`, HttpMethod.DELETE);
      });
      it('DELETE method should be called with options', () => {
        const headers = new HttpHeaders({ test: 'test' });
        spectator.service.delete('testUrl', { headers }).subscribe();
        spectator.expectOne(`${environment.baseAPIUrl}/testUrl`, HttpMethod.DELETE);
      });
    });
  });
});
