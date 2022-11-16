import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { defaultErrorhandler } from '@utils/functions';
import { NotificationService } from '@services/notification.service';
import { AttributeType } from '@src/app/models/attributeType';
import { AttributeTypeDictionary } from '../models/attributeTypeDictionary';
import { FetchService } from './fetch.service';

export interface AttributeTypeDto {
  basicType: string;
  id: number;
  identifier: boolean;
  name: string;
  label: string;
  validation: string;
  icon: string;
  isEdit: boolean;
}

export interface Types {
  basicType: string;
  viewValue: string;
}

@Injectable({
  providedIn: 'root',
})
export class AttributesService {
  public errorHandler = defaultErrorhandler;

  public attributes: AttributeType[] | null = null;

  public attributesDictionary: AttributeTypeDictionary = {};

  public identifiedAttributes: AttributeType[] | null = null;

  constructor(private fetch: FetchService, public notification: NotificationService) {}

  public getAllAttributes() {
    return this.fetch.get<AttributeTypeDto[]>(`attributetypes?pageNumber=1&pageSize=100`);
  }

  public handleResponse(resolve: AttributeType[]): void {
    this.attributes = resolve;
    this.identifiedAttributes = resolve.filter((el: AttributeType) => el.identifier);
    resolve.forEach((el) => {
      this.attributesDictionary[el.name] = { ...el };
    });
  }

  public mapAllAttributes(allAttributes: AttributeTypeDto): AttributeType {
    return allAttributes;
  }

  public updateAttribute(id: number, typesDto: any): Observable<AttributeType> {
    return this.fetch
      .patch<AttributeType>(`attributes/${id}`, this.mapAllAttributes(typesDto))
      .pipe(catchError((error) => this.errorHandler(this.notification, error)));
  }
}
