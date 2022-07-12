import { Injectable } from '@angular/core';
import { AttributeType, AttributeTypeDictionary } from '@src/app/models/attributes';
import { FetchService } from './fetch.service';

@Injectable({
  providedIn: 'root',
})
export class AttributesService {
  public attributes: AttributeType[] | null = null;

  public attributesDictionary: AttributeTypeDictionary = {};

  public identifiedAttributes: AttributeType[] | null = null;

  constructor(private fetch: FetchService) {}

  public getAllAttributes() {
    return this.fetch.get<AttributeType[]>(`attributetypes?pageNumber=1&pageSize=100`).subscribe({
      next: (resolve) => {
        this.attributes = resolve;
        this.identifiedAttributes = resolve.filter((el: AttributeType) => el.identifier);
        resolve.forEach((el) => {
          this.attributesDictionary[el.name] = { ...el };
        });
      },
    });
  }
}
