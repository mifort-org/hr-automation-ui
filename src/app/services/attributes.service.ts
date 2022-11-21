import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { defaultErrorhandler } from '@utils/functions';
import { NotificationService } from '@services/notification.service';
import { Attribute } from '@src/app/models/attributeType';
import { AttributeTypeDictionary } from '../models/attributeTypeDictionary';
import { FetchService } from './fetch.service';

@Injectable({
  providedIn: 'root',
})
export class AttributesService {
  public errorHandler = defaultErrorhandler;

  public attributes: Attribute[] | null = null;

  public attributesDictionary: AttributeTypeDictionary = {};

  public identifiedAttributes: Attribute[] | null = null;

  constructor(private fetch: FetchService, public notification: NotificationService) {}

  public getAllAttributes() {
    return this.fetch.get<Attribute[]>(`attributetypes?pageNumber=1&pageSize=100`);
  }

  public handleResponse(resolve: Attribute[]): void {
    this.attributes = resolve;
    this.identifiedAttributes = resolve.filter((el: Attribute) => el.isIdentifier);
    resolve.forEach((el) => {
      this.attributesDictionary[el.name] = { ...el };
    });
  }

  public updateAttribute(id: number, typesDto: Attribute): Observable<Attribute> {
    return this.fetch
      .patch<Attribute>(`attributetypes/${id}`, typesDto)
      .pipe(catchError((error) => this.errorHandler(this.notification, error)));
  }

  public createAttribute(typeDto: Attribute): Observable<Attribute> {
    return this.fetch
      .post<Attribute>(`attributetypes`, typeDto)
      .pipe(catchError((error) => this.errorHandler(this.notification, error)));
  }

  public deleteAttribute(id: number): Observable<Attribute> {
    return this.fetch
      .delete<Attribute>(`attributetypes/${id}`)
      .pipe(catchError((error) => this.errorHandler(this.notification, error)));
  }
}
