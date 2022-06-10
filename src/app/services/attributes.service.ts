import { Injectable } from '@angular/core';
import { AttributeType, AttributeTypeDictionary } from '@interfaces/attributes';
import { FetchService } from './fetch.service';

@Injectable({
  providedIn: 'root',
})
export class AttributesService {
  public attributes: AttributeType[] | null = null;

  public attributesDictionary: AttributeTypeDictionary = {};

  public identifiedAttributes: AttributeType[] | null = null;

  constructor(private _fetch: FetchService) {}

  getAllAttributes() {
    return this._fetch.get<AttributeType[]>(`attributetypes?pageNumber=1&pageSize=100`).subscribe({
      next: (resolve) => {
        this.attributes = resolve;
        this.identifiedAttributes = resolve.filter((el) => el.identifier === true);
        resolve.forEach((el) => {
          this.attributesDictionary[el.name] = { ...el };
        });
      },
    });
  }
}
