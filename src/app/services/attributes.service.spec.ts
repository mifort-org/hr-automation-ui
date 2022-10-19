import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { environment } from '../../environments/environment';
import { AttributeType } from '../models/attributeType';
import { AttributesService } from './attributes.service';

describe('AttributesService', () => {
  let spectator: SpectatorHttp<AttributesService>;
  let data: AttributeType;
  const createHttp = createHttpFactory(AttributesService);
  const baseUrl = environment.baseAPIUrl;

  beforeEach(() => {
    spectator = createHttp();
    data = {
      basicType: 'string',
      id: 1,
      identifier: true,
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

    it('should handle response', () => {
      const resolve: AttributeType[] = [data];
      spectator.service.handleResponse(resolve);
      expect(spectator.service.attributes).toEqual(resolve);
      expect(spectator.service.identifiedAttributes).toEqual(
        resolve.filter((el: AttributeType) => el.identifier)
      );
      resolve.forEach((el) => {
        expect(spectator.service.attributesDictionary[el.name]).toEqual({ ...el });
      });
    });

    it('should map all attributes', () => {
      const functionValue = spectator.service.mapAllAttributes(data);
      expect(functionValue).toEqual(data);
    });
  });
});
