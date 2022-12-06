import { Overlay } from '@angular/cdk/overlay';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { environment } from '../../environments/environment';
import { Attribute } from '../models/attributeType';
import { AttributesService } from './attributes.service';

describe('AttributesService', () => {
  let spectator: SpectatorHttp<AttributesService>;
  let handlerSpy: jest.SpyInstance;
  const error = { statusText: 'error', status: 500 };
  const success = { statusText: 'success', status: 200 };
  let data: Attribute;
  // const createHttp = createHttpFactory(AttributesService);
  const baseUrl = environment.baseAPIUrl;
  const requestUrl = `${environment.baseAPIUrl}/attributetypes/1`;
  const errorResponse = new HttpErrorResponse({
    statusText: 'error',
    status: 500,
    url: requestUrl,
  });
  const createHttp = createHttpFactory({
    service: AttributesService,
    providers: [MatSnackBar, Overlay],
  });

  beforeEach(() => {
    spectator = createHttp();
    data = {
      basicType: 'string',
      id: 1,
      isIdentifier: true,
      isMultivalued: true,
      isEdit: true,
      name: 'string',
      label: 'string',
      validation: 'string',
      icon: 'string',
    };
  });

  describe('create', () => {
    it('should be create', () => {
      expect(spectator).toBeTruthy();
    });
  });

  describe('service methods', () => {
    it('should get all attributes', () => {
      spectator.service.getAllAttributes().subscribe();
      spectator.expectOne(`${baseUrl}/attributetypes?pageNumber=1&pageSize=100`, HttpMethod.GET);
    });
  });

  describe('service methods', () => {
    it('should handle response', () => {
      const resolve: Attribute[] = [data];
      spectator.service.handleResponse(resolve);
      expect(spectator.service.attributes).toEqual(resolve);
      expect(spectator.service.identifiedAttributes).toEqual(
        resolve.filter((el: Attribute) => el.isIdentifier)
      );
      resolve.forEach((el) => {
        expect(spectator.service.attributesDictionary[el.name]).toEqual({ ...el });
      });
    });
  });

  describe('Update Attribute', () => {
    it('should update attributes', () => {
      const resolve: Attribute = data;
      const url = `${environment.baseAPIUrl}/attributetypes/1, ${resolve}`;
      spectator.service.updateAttribute(1, resolve).subscribe();
      spectator.expectOne(url, HttpMethod.PATCH).flush('', { ...error, status: 500 });
      expect(handlerSpy).toHaveBeenCalledWith(spectator.service.notification, errorResponse);
    });

    it('should update attributes and return success message', () => {
      const resolve: Attribute = data;
      const url = `${environment.baseAPIUrl}/attributetypes/1, ${resolve}`;
      spectator.service.updateAttribute(1, resolve).subscribe();
      spectator.expectOne(url, HttpMethod.PATCH).flush('', { ...success, status: 200 });
      expect(handlerSpy).toHaveBeenCalledWith(spectator.service.notification, success);
    });
  });

  describe('Create Attribute', () => {
    it('should create attributes', () => {
      const resolve: Attribute = data;
      const url = `${environment.baseAPIUrl}/attributetypes, ${resolve}`;
      spectator.service.createAttribute(resolve).subscribe();
      spectator.expectOne(url, HttpMethod.POST).flush('', { ...error, status: 500 });
      expect(handlerSpy).toHaveBeenCalledWith(
        spectator.service.notification,
        new HttpErrorResponse({
          ...error,
          status: 500,
          url: `${environment.baseAPIUrl}/attributetypes, ${resolve}`,
        })
      );
    });

    it('should create attribute and return success message ', () => {
      const resolve: Attribute = data;
      const url = `${environment.baseAPIUrl}/attributetypes, ${resolve}`;
      spectator.service.createAttribute(resolve).subscribe();
      spectator.expectOne(url, HttpMethod.POST).flush('', { ...success, status: 200 });
      expect(handlerSpy).toHaveBeenCalledWith(spectator.service.notification, success);
    });
  });

  describe('Delete Attribute', () => {
    it('should delete attribute', () => {
      spectator.service.deleteAttribute(1).subscribe();
      spectator
        .expectOne(`${environment.baseAPIUrl}/attributetypes/1`, HttpMethod.DELETE)
        .flush('', error);
    });

    it('should delete attribute', () => {
      spectator.service.deleteAttribute(1).subscribe();
      spectator
        .expectOne(`${environment.baseAPIUrl}/attributetypes/1`, HttpMethod.DELETE)
        .flush('', success);
    });
  });
});
